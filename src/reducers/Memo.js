import { ADD_MEMO, EDIT_MEMO, REMOVE_MEMO } from '../actions/Memo.js'

export function memos (state = [], action) {
  switch (action.type) {
    case ADD_MEMO:
      return [
        ...state,
        {
          id: action.id,
          text: '',
          position: action.position
        }
      ]
    case EDIT_MEMO:
      const editFunc = (node) => {
        if (node.id === action.id) {
          return Object.assign({}, node, {
            text: action.text,
            position: action.position
          })
        }
        return node
      }
      return state.map(editFunc)
    case REMOVE_MEMO:
      return state.filter((node) => node.id !== action.id)
    default:
      return state
  }
}
