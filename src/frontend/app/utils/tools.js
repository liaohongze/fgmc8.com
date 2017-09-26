import moment from 'moment'

moment.locale('zh-cn')

export function formatDate(date, frm) {
  return moment(date).format(frm)
}

export function CountDown(stockTime) {
  // 获取当前时间  
  let date = new Date()
  let now = date.getTime()
  // 设置截止时间
  let stockDate = new Date(formatDate(stockTime))
  let stock = stockDate.getTime()
  let end = stock + 3600000 // 时长的毫秒数 3600000为一个小时
  // 时间差  
  let leftTime = end - now
  let m
  let s
  if (leftTime >= 0) {
    m = Math.floor(leftTime / 1000 / 60 % 60)
    s = Math.floor(leftTime / 1000 % 60)
    s = (s < 10) ? ('0' + s) : s
    return m + ':' + s
  } else {
    return '00:01'
  }
}