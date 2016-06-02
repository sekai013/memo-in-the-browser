import { CUT_MEMO, COPY_MEMO } from '../actions/MemoClipboard.js'

export function clipboard (state = '', action) {
  switch (action.type) {
    case CUT_MEMO:
      return action.text
    case COPY_MEMO:
      return action.text
    default:
      return state
  }
}
