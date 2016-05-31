import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import uuid from 'uuid'
import Reducer from './reducers/Reducer.js'
import MemoContainer from './components/MemoContainer.js'
import { addMemo } from './actions/Memo.js'
import stateToActions from './libs/stateToActions.js'

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
    chrome.runtime.sendMessage({
      type: 'saveAction',
      actions: stateToActions(store.getState())
    })
  })
})
render(
  <Provider store={store}>
    <MemoContainer />
  </Provider>,
  container
)

const generateUniqId = (memos) => {
  const idList = memos.map((memo) => memo.id)
  let uniqId = ''

  do {
    uniqId = uuid.v4()
  } while (idList.some((id) => id === uniqId))

  return uniqId
}

window.addEventListener('dblclick', (event) => {
  const action = addMemo(
    generateUniqId(store.getState().memos),
    { left: event.pageX, top: event.pageY }
  )
  store.dispatch(action)
})
