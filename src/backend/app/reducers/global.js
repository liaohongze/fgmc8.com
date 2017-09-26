import * as types from '../constants'

const initState = {
  animateCls: 'normal'
}

export const global = (state = initState, action) => {
  switch (action.type) {
    case types.CURRENT_ANIMATE:
      return {
        ...state,
        animateCls: action.cls
      }
    default:
      return state
  }
}