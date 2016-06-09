export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'
export const SWITCH_MENU = 'SWITCH_MENU'

export const showMenu = () => {
  return {
    type: SHOW_MENU
  }
}

export const hideMenu = () => {
  return {
    type: HIDE_MENU
  }
}

export const switchMenu = () => {
  return {
    type: SWITCH_MENU
  }
}
