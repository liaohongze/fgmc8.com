import fetch from 'isomorphic-fetch'

function login(values, cb) {
  return fetch(`/api/account/signin`, {
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

function signup(values, cb) {
  return fetch(`/api/account/signup`, {
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

function refreshToken(token, cb) {
  return fetch(`/api/refreshToken`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getUser(id, cb) {
  return fetch(`/api/customers/${id}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function createUser(id, values, cb) {
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

function getUsers(cb) {
  return fetch(`/api/customers`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getRecommend(name, cb) {
  return fetch(`/api/customers/${name}/recommends`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function changePassword(values, id, cb) {
  return fetch(`/api/customers/${id}/changepassword`, {
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

function editUser(values, id, cb) {
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

// 验证是否存在
function customerExist(name, cb) {
  return fetch(`/api/customers/${name}/exist`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function mobileExist(mobile, cb) {
  return fetch(`/api/customers/${mobile}/mobile`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function nicknameExist(nickname, cb) {
  return fetch(`/api/customers/${nickname}/nickname`, {
    method: 'GET'
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

// About
function getAbout(sign, cb) {
  return fetch(`/api/abouts/${sign}/sign`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 牧场游戏
function getPastures(id, cb) {
  return fetch(`/api/pastures/${id}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function openPasture(values, cb) {
  return fetch(`/api/pastures`, {
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

function recycle(values, cb) {
  return fetch(`/api/pastures/recycling`, {
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

function stocking(values, cb) {
  return fetch(`/api/pastures/stocking`, {
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

// 充值
function getRecharges(customerId, pageIndex, pageSize, cb) {
  return fetch(`/api/recharges/${customerId}/all?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function Recharges(values, cb) {
  return fetch(`/api/recharges`, {
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

// 交易中心
function transactions(values, cb) {
  return fetch(`/api/transactions`, {
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

function transactionsAction(values, cb) {
  return fetch(`/api/transactions/confirm`, {
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

function getSellRecord(name, pageIndex, pageSize, cb) {
  return fetch(`/api/transactions/${name}/seller?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getBuyRecord(name, pageIndex, pageSize, cb) {
  return fetch(`/api/transactions/${name}/buyer?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getDirects(customerId, cb) {
  return fetch(`/api/directs/${customerId}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function withdraws(values, cb) {
  return fetch(`/api/withdraws`, {
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

function withdrawsRecord(id, pageIndex, pageSize, cb) {
  return fetch(`/api/withdraws/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 转盘游戏
function getPrizes(cb) {
  return fetch(`/api/prizes`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function turntable(values, cb) {
  return fetch(`/api/turntable`, {
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

function getTurntable(id, pageIndex, pageSize, cb) {
  return fetch(`/api/turntable/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 庄和闲游戏
function getWillage(values, cb) {
  return fetch(`/api/willagewithidles`, {
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

function getWillageRecord(customerId, pageIndex, pageSize, cb) {
  return fetch(`/api/willagewithidles/${customerId}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 外链获取二维码
function getQRCode(name, cb) {
  return fetch(`http://pic.redbon.cn/qrcode/${name}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 其它
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

// function parseTEXT(response) {
//   return response.text()
// }

const Client = {
  login,
  signup,
  refreshToken,
  changePassword,
  getUsers,
  getUser,
  getRecommend,
  getDirects,
  createUser,
  editUser,
  customerExist,
  mobileExist,
  nicknameExist,
  getArticles,
  getArticle,
  getAbout,
  getPastures,
  openPasture,
  recycle,
  stocking,
  getRecharges,
  Recharges,
  getSellRecord,
  transactions,
  transactionsAction,
  getBuyRecord,
  getRaises,
  getIncomes,
  getPrizes,
  turntable,
  getTurntable,
  getQRCode,
  withdraws,
  withdrawsRecord,
  getWillage,
  getWillageRecord
}

export default Client