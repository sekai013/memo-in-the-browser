import { combineReducers } from 'redux'
import { memos } from './Memo.js'
import { focusedMemoId } from './FocusedMemoId.js'
import { hoveredMemoId } from './HoveredMemoId.js'
import { clipboard } from './Clipboard.js'
import { menuCursorPosition } from './MenuCursorPosition.js'

export default combineReducers({
  memos,
  focusedMemoId,
  hoveredMemoId,
  clipboard,
  menuCursorPosition
})
