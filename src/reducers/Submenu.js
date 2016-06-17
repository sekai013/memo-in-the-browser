import { SET_LINE_COLOR, SET_BACKGROUND_COLOR } from '../actions/Color.js'

const initialState = {
  lineColor: '#ffffff',
  backgroundColor: '#e8e8e8'
}

export function subMenu (state = initialState, action) {
  switch (action.type) {
    case SET_LINE_COLOR:
      return Object.assign({}, state, { lineColor: action.color })
    case SET_BACKGROUND_COLOR:
      return Object.assign({}, state, { backgroundColor: action.color })
    default:
      return state
  }
}
