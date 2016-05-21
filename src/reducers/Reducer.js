import { combineReducers } from 'redux'
import { memos } from './Memo.js'
import { focusedMemoId } from './FocusedMemoId.js'

export default combineReducers({
  memos,
  focusedMemoId
})
