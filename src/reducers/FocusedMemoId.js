import { ADD_MEMO, FOCUS_ON_MEMO } from '../actions/Memo.js'

export function focusedMemoId (state = '', action) {
  switch (action.type) {
    case ADD_MEMO:
      return action.id
    case FOCUS_ON_MEMO:
      return action.id
    default:
      return state
  }
}
