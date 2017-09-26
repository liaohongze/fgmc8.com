import fetch from 'isomorphic-fetch'
function login(values, cb) {
  return fetch(`/api/account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// function signup(values, cb) {
//   return fetch(`api/account/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(values)
//   })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(cb)
// }

// function refreshToken(token, cb) {
//   return fetch(`/api/refreshToken`, {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(cb)
// }

// 管理员
function getUser(name, cb) {
  return fetch(`/api/users/${name}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function changeAdminPwd(values, id, cb) {
  return fetch(`/api/users/${id}/changepassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 锁定用户
function lockout(id, values, cb) {
  return fetch(`/api/users/${id}/lockout`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 用户
function getCustomer(name, cb) {
  return fetch(`/api/customers/${name}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getCustomerByName(name, cb) {
  return fetch(`/api/customers/${name}/name`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function createCustomer(values, id, cb) {
  return fetch(`/api/customers/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getCustomers(pageIndex, pageSize, cb) {
  return fetch(`/api/customers?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function resetPassword(values, id, cb) {
  return fetch(`/api/users/${id}/resetpassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function editCustomer(values, id, cb) {
  return fetch(`/api/customers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function deleteCustomer(id, cb) {
  return fetch(`/api/customers/${id}`, {
    method: 'DELETE'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 文章
function getArticles(pageIndex, pageSize, cb) {
  return fetch(`/api/articles?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getArticle(id, cb) {
  return fetch(`/api/articles/${id}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function createArticle(values, cb) {
  return fetch(`/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function deleteArticle(id, cb) {
  return fetch(`/api/articles/${id}`, {
    method: 'DELETE'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function editArticle(id, values, cb) {
  return fetch(`/api/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 充值
function getRecharge(id, cb) {
  return fetch(`/api/recharges/${id}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getRecharges(pageIndex, pageSize, cb) {
  return fetch(`/api/recharges?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function Recharge(id, values, cb) {
  return fetch(`/api/users/${id}/recharge`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 牧场
function getPastures(pageIndex, pageSize, cb) {
  return fetch(`/api/pastures?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getUserPastures(id, cb) {
  return fetch(`/api/pastures/${id}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 养殖记录
function getRaises(id, cb) {
  return fetch(`/api/pastures/${id}/raises`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getIncomes(id, cb) {
  return fetch(`/api/pastures/${id}/incomes`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 交易
function getTransactions(pageIndex, pageSize, cb) {
  return fetch(`/api/transactions?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getUserTransactions(id, pageIndex, pageSize, cb) {
  return fetch(`/api/transactions/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 关于
function getAbouts(pageIndex, pageSize, cb) {
  return fetch(`/api/abouts?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function deleteAbout(id, cb) {
  return fetch(`/api/abouts/${id}`, {
    method: 'DELETE'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getAbout(id, cb) {
  return fetch(`/api/abouts/${id}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function createAbout(values, cb) {
  return fetch(`/api/abouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function editAbout(id, values, cb) {
  return fetch(`/api/abouts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 提现
function getWithdraw(pageIndex, pageSize, cb) {
  return fetch(`/api/withdraws?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function withdraws(type, values, cb) {
  return fetch(`/api/withdraws/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function confirmWithdraws(values, cb) {
  return fetch(`/api/withdraws/confirm`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 转盘
function getPrizes(cb) {
  return fetch(`/api/prizes`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function deletePrize(id, cb) {
  return fetch(`/api/prizes/${id}`, {
    method: 'DELETE'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getPrize(id, cb) {
  return fetch(`/api/prizes/${id}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function editPrize(id, values, cb) {
  return fetch(`/api/prizes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function createPrize(values, cb) {
  return fetch(`/api/prizes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getTurntableReacord(pageIndex, pageSize, cb) {
  return fetch(`/api/turntable?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 庄和闲
function getWillageWithIdles(pageIndex, pageSize, cb) {
  return fetch(`/api/willagewithidles?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 其他
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(response) // eslint-disable-line no-console
  console.log(error) // eslint-disable-line no-console
  throw error
}

function parseJSON(response) {
  return response.json()
}

const Client = {
  login,
  getUser,
  changeAdminPwd,
  resetPassword,
  lockout,
  getCustomer,
  getCustomerByName,
  getCustomers,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getArticles,
  getArticle,
  deleteArticle,
  editArticle,
  createArticle,
  getRecharge,
  getRecharges,
  Recharge,
  getPastures,
  getUserPastures,
  getRaises,
  getIncomes,
  getTransactions,
  getUserTransactions,
  getAbouts,
  getAbout,
  deleteAbout,
  editAbout,
  createAbout,
  getWithdraw,
  withdraws,
  confirmWithdraws,
  getPrizes,
  deletePrize,
  getPrize,
  editPrize,
  createPrize,
  getTurntableReacord,
  getWillageWithIdles
}

export default Client