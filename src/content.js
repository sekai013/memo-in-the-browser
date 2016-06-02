import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './reducers/Reducer.js'
import MemoContainer from './components/MemoContainer.js'
import { addMemo, loadMemo } from './actions/Memo.js'
import { copyMemo, cutMemo, clearHoveredMemo, saveCursorPosition } from './actions/MemoClipboard.js'
import stateToActions from './libs/stateToActions.js'
import generateUniqId from './libs/generateUniqId.js'
import getMemoById from './libs/getMemoById.js'

const container = document.createElement('div')
container.id = 'memoInTheBrowser'
container.className = 'memoInTheBrowser'
document.body.appendChild(container)

const store = createStore(Reducer)
chrome.runtime.sendMessage({
  type: 'loadAction'
}, (response) => {
  response.actions.forEach((action) => { store.dispatch(action) })
  store.subscribe(() => {
    const state = store.getState()
    chrome.runtime.sendMessage({
      type: 'saveAction',
      actions: stateToActions(state)
    })
    const cutAndCopyMode = state.hoveredMemoId ? 'enable' : 'disable'
    chrome.runtime.sendMessage({
      type: `${cutAndCopyMode}CutAndCopy`
    })
    const pasteMode = state.clipboard ? 'enable' : 'disable'
    chrome.runtime.sendMessage({
      type: `${pasteMode}Paste`
    })
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { memos, hoveredMemoId, clipboard, menuCursorPosition } = store.getState()
  const memo = getMemoById(memos, hoveredMemoId)
  switch (message.type) {
    case 'cutMemo':
      store.dispatch(cutMemo(memo.id, memo.text))
      return true
    case 'copyMemo':
      store.dispatch(copyMemo(memo.id, memo.text))
      return true
    case 'pasteMemo':
      const uniqId = generateUniqId(memos)
      store.dispatch(loadMemo(uniqId, clipboard, menuCursorPosition))
      return true
    default:
      return false
  }
})

render(
  <Provider store={store}>
    <MemoContainer />
  </Provider>,
  container
)

window.addEventListener('dblclick', (event) => {
  const action = addMemo(
    generateUniqId(store.getState().memos),
    { left: event.pageX, top: event.pageY }
  )
  store.dispatch(action)
})

window.addEventListener('mousedown', (event) => {
  if (event.button !== 2) return
  store.dispatch(clearHoveredMemo())
  store.dispatch(saveCursorPosition(event.pageX, event.pageY))
})
