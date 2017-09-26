import Client from './Client'

const auth = {
  isAuthenticated: () => {
    const loginStatu = auth.getLoginStatu()
    if (loginStatu === 'true') {
      return true
    } else {
      return false
    }
  },
  authenticate: (values, cb) => {
    Client.login(values, (result) => {
      if (!result.errored) {
        auth.saveLoginStatu(!result.errored)
        auth.saveCurrentUserName(result.object.userName)
        auth.saveCurrentUserId(result.object.userId)
      }
      const success = true
      const failed = false
      if (auth.getLoginStatu() === 'true') {
        cb(success)
      } else {
        cb(failed)
      }
    })
  },
  signout: () => {
    auth.removeLoginStatu()
  }
}

auth.saveLoginStatu = (statu) => {
  window.localStorage.setItem('loginStatu', statu)
}

auth.getLoginStatu = () => {
  return window.localStorage.getItem('loginStatu')
}

auth.removeLoginStatu = () => {
  window.localStorage.removeItem('loginStatu')
  window.localStorage.removeItem('currentUserName')
  window.localStorage.removeItem('currentUserId')
}

auth.saveCurrentUserName = (name) => {
  window.localStorage.setItem('currentUserName', name)
}

auth.saveCurrentUserId = (id) => {
  window.localStorage.setItem('currentUserId', id)
}

auth.getCurrentUser = () => {
  return {'userName': window.localStorage.getItem('currentUserName'), 'id': window.localStorage.getItem('currentUserId')}
}

const isLogin = function () {
  const token = auth.getToken()
  if (token) {
    let payload = JSON.parse(window.atob(token.split('.')[1]))
    return payload.exp > Date.now() / 1000
  } else {
    return false
  }
}

const currentUser = function () {
  if (isLogin()) {
    const token = auth.getToken()
    let payload = JSON.parse(window.atob(token.split('.')[1]))
    return {
      id: payload.data.id,
      name: payload.data.username
    }
  }
}

export {
  auth,
  isLogin,
  currentUser
}