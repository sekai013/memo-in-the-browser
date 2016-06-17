import { loadMemo, focusOnMemo } from '../actions/Memo.js'

export default (state) => {
  const { memos, focusedMemoId } = state
  const actions = []

  actions.push(...memos.map((memo) => loadMemo(memo.id, memo.text, memo.position, memo.color)))
  actions.push(focusOnMemo(focusedMemoId))

  return actions
}
