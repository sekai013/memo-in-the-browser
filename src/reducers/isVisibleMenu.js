import { SHOW_MENU, HIDE_MENU, SWITCH_MENU } from '../actions/Menu.js'

export function isVisibleMenu (state = false, action) {
  switch (action.type) {
    case SHOW_MENU:
      return true
    case HIDE_MENU:
      return false
    case SWITCH_MENU:
      return !state
    default:
      return state
  }
}
