import moment from 'moment'

moment.locale('zh-cn')

export function formatDate(date, frm) {
  return moment(date).format(frm)
}

export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}