import { HOVER_MEMO, CLEAR_HOVERED_MEMO } from '../actions/MemoClipboard.js'

export function hoveredMemoId (state = '', action) {
  switch (action.type) {
    case HOVER_MEMO:
      return action.id
    case CLEAR_HOVERED_MEMO:
      return ''
    default:
      return state
  }
}
