export const HOVER_MEMO = 'HOVER_MEMO'
export const CLEAR_HOVERED_MEMO = 'CLEAR_HOVERED_MEMO'
export const CUT_MEMO = 'CUT_MEMO'
export const COPY_MEMO = 'COPY_MEMO'
export const SAVE_CURSOR_POSITION = 'SAVE_CURSOR_POSITION'

export const hoverMemo = (id) => {
  return {
    type: HOVER_MEMO,
    id
  }
}

export const clearHoveredMemo = () => {
  return {
    type: CLEAR_HOVERED_MEMO
  }
}

export const cutMemo = (id, text) => {
  return {
    type: CUT_MEMO,
    id,
    text
  }
}

export const copyMemo = (id, text) => {
  return {
    type: COPY_MEMO,
    text
  }
}

export const saveCursorPosition = (left, top) => {
  return {
    type: SAVE_CURSOR_POSITION,
    left,
    top
  }
}
