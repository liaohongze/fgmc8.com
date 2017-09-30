import fetch from 'isomorphic-fetch'

function login(values, cb) {
  return fetch(`http://auth.fgmc8.com/token/customer/FGMC8Audience`, {
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

function signup(values, token, cb) {
  return fetch(`/api/account/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

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

function getUser(id, token, cb) {
  return fetch(`/api/customers/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function createUser(id, values, token, cb) {
  return fetch(`/api/customers/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getUsers(token, cb) {
  return fetch(`/api/customers`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getRecommend(name, token, cb) {
  return fetch(`/api/customers/${name}/recommends`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function changePassword(values, id, token, cb) {
  return fetch(`/api/customers/${id}/changepassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function editUser(values, id, token, cb) {
  return fetch(`/api/customers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 验证是否存在
function customerExist(name, token, cb) {
  return fetch(`/api/customers/${name}/exist`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function mobileExist(mobile, token, cb) {
  return fetch(`/api/customers/${mobile}/mobile`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function nicknameExist(nickname, token, cb) {
  return fetch(`/api/customers/${nickname}/nickname`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 文章
function getArticles(pageIndex, pageSize, token, cb) {
  return fetch(`/api/articles?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getArticle(id, token, cb) {
  return fetch(`/api/articles/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// About
function getAbout(sign, token, cb) {
  return fetch(`/api/abouts/${sign}/sign`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 牧场游戏
function getPastures(id, token, cb) {
  return fetch(`/api/pastures/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function openPasture(values, token, cb) {
  return fetch(`/api/pastures`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function recycle(values, token, cb) {
  return fetch(`/api/pastures/recycling`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function stocking(values, token, cb) {
  return fetch(`/api/pastures/stocking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 养殖记录
function getRaises(id, token, cb) {
  return fetch(`/api/pastures/${id}/raises`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getIncomes(id, token, cb) {
  return fetch(`/api/pastures/${id}/incomes`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 充值
function getRecharges(customerId, pageIndex, pageSize, token, cb) {
  return fetch(`/api/recharges/${customerId}/all?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function Recharges(values, token, cb) {
  return fetch(`/api/recharges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 交易中心
function transactions(values, token, cb) {
  return fetch(`/api/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function transactionsAction(values, token, cb) {
  return fetch(`/api/transactions/confirm`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getSellRecord(name, pageIndex, pageSize, token, cb) {
  return fetch(`/api/transactions/${name}/seller?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getBuyRecord(name, pageIndex, pageSize, token, cb) {
  return fetch(`/api/transactions/${name}/buyer?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getDirects(customerId, token, cb) {
  return fetch(`/api/directs/${customerId}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function withdraws(values, token, cb) {
  return fetch(`/api/withdraws`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function withdrawsRecord(id, pageIndex, pageSize, token, cb) {
  return fetch(`/api/withdraws/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 转盘游戏
function getPrizes(token, cb) {
  return fetch(`/api/prizes`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function turntable(values, token, cb) {
  return fetch(`/api/turntable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getTurntable(id, pageIndex, pageSize, token, cb) {
  return fetch(`/api/turntable/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 庄和闲游戏
function getWillage(values, token, cb) {
  return fetch(`/api/willagewithidles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getNoBet(values, id, token, cb) {
  return fetch(`/api/gamblings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(values)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getWillageRecord(customerId, pageIndex, pageSize, token, cb) {
  return fetch(`/api/willagewithidles/${customerId}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}
// 游戏一开始获取期数
function gamblings(token, cb) {
  return fetch(`/api/gamblings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 获取往期
function getGamblingsRound(token, cb) {
  return fetch(`/api/gamblings/round`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// 外链获取二维码
function getQRCode(name, token, cb) {
  return fetch(`http://pic.redbon.cn/qrcode/${name}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
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
  // refreshToken,
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
  getWillageRecord,
  gamblings,
  getNoBet,
  getGamblingsRound
}

export default Client