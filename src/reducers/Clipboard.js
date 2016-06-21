import { CUT_MEMO, COPY_MEMO } from '../actions/MemoClipboard.js'

const initialState = {
  text: '',
  color: {
    lineColor: '#ffffff',
    backgroundColor: '#e8e8e8'
  }
}

export function clipboard (state = initialState, action) {
  switch (action.type) {
    case CUT_MEMO:
      return Object.assign({}, state, {
        text: action.text,
        color: action.color
      })
    case COPY_MEMO:
      return Object.assign({}, state, {
        text: action.text,
        color: action.color
      })
    default:
      return state
  }
}
