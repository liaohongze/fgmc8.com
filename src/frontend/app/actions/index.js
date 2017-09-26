import * as types from '../constants'
import { CALL_API } from '../middlewares/api'

function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(token) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: token
  }
}

function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export const login = (creds) => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch('/api/auth', config)
      .then(response =>
        response.json()
          .then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          localStorage.setItem('token', user.data.token)
          dispatch(receiveLogin(user.data.token))
        }
      }).catch(err => console.log('Error:', err))
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    dispatch(receiveLogout())
  }
}

export const signup = (username, password) => ({
  type: types.SIGNUP_REQUEST,
  username,
  password
})

export function fetchOrders() {
  return {
    [CALL_API]: {
      endpoint: 'orders',
      authenticated: true,
      types: [types.ORDERS_REQUEST, types.ORDERS_SUCCESS, types.ORDERS_FAILURE]
    }
  }
}