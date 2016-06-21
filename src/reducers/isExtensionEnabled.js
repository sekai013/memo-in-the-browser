import { SWITCH_EXTENSION } from '../actions/Extension.js'

export function isExtensionEnabled (state = true, action) {
  switch (action.type) {
    case SWITCH_EXTENSION:
      return !state
    default:
      return state
  }
}
