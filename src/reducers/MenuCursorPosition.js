import { SAVE_CURSOR_POSITION } from '../actions/MemoClipboard.js'

const initialState = {
  left: 0,
  top: 0
}

export function menuCursorPosition (state = initialState, action) {
  switch (action.type) {
    case SAVE_CURSOR_POSITION:
      return {
        left: action.left,
        top: action.top
      }
    default:
      return state
  }
}
