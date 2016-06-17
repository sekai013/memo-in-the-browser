export const SET_LINE_COLOR = 'SET_LINE_COLOR'
export const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR'

export const setLineColor = (color) => {
  return {
    type: SET_LINE_COLOR,
    color
  }
}

export const setBackgroundColor = (color) => {
  return {
    type: SET_BACKGROUND_COLOR,
    color
  }
}
