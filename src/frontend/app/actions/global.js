import * as types from '../constants'

export const currentAnimate = (cls) => ({
  type: types.CURRENT_ANIMATE,
  cls
})