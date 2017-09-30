import Client from './Client'

const auth = {
  isAuthenticated: () => {
    const token = auth.getToken()
    if (token) {
      let payload = JSON.parse(window.atob(token.split('.')[1]))
      let nowDate = Date.now() / 1000
      if (payload.exp > nowDate) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  authenticate: (values, cb) => {
    Client.login(values, (result) => {
      if (!result.errored) {
        auth.saveToken(result.object)
      }
      const success = true
      const failed = false
      if (auth.getToken()) {
        cb(success)
      } else {
        cb(failed)
      }
    })
  },
  signout: () => {
    auth.removeToken()
  }
}

auth.saveToken = (token) => {
  window.localStorage.setItem('token', token)
}

auth.getToken = () => {
  return window.localStorage.getItem('token')
}

auth.removeToken = () => {
  window.localStorage.removeItem('token')
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
      id: payload.nameid,
      name: payload.unique_name
    }
  }
}

export {
  auth,
  isLogin,
  currentUser
}