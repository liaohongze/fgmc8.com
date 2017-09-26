import * as t from './actionTypes'

export const add = (text) => ({
  type: t.ADD,
  payload: { text }
})

export const requestCart = (id) => {
  return async (dispatch) => {
    const response = await fetch(`/carts/${id}`)
    dispatch({ type: t.REQUEST, payload: response.carts })
  }
}