export const ADD_MEMO = 'ADD_MEMO'
export const EDIT_MEMO = 'EDIT_MEMO'
export const REMOVE_MEMO = 'REMOVE_MEMO'
export const FOCUS_ON_MEMO = 'FOCUS_ON_MEMO'

export const addMemo = (id, position) => {
  return {
    type: ADD_MEMO,
    id,
    position
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
