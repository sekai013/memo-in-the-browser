export const ADD_MEMO = 'ADD_MEMO'
export const EDIT_MEMO = 'EDIT_MEMO'
export const LOAD_MEMO = 'LOAD_MEMO'
export const REMOVE_MEMO = 'REMOVE_MEMO'
export const FOCUS_ON_MEMO = 'FOCUS_ON_MEMO'

export const addMemo = (id, position, color) => {
  return {
    type: ADD_MEMO,
    id,
    position,
    color
  }
}

export const editMemo = (id, text, position) => {
  return {
    type: EDIT_MEMO,
    id,
    text,
    position
  }
}

export const loadMemo = (id, text, position, color) => {
  return {
    type: LOAD_MEMO,
    id,
    text,
    position,
    color
  }
}

export const removeMemo = (id) => {
  return {
    type: REMOVE_MEMO,
    id
  }
}

export const focusOnMemo = (id) => {
  return {
    type: FOCUS_ON_MEMO,
    id
  }
}
