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
    return '00:00'
  }
}

export function getCaptcha() {
  let expression = ''
  let result = 0

  let Calpre = Math.round(Math.random() * 10)
  let Calafter = Math.round(Math.random() * 10)

  var codeCal = ['-', '+', 'x']
  var i = Math.round(Math.random() * 2)

  switch (codeCal[i]) { // 判断运算符并计算
    case '-':
      expression = Calpre + '-' + Calafter
      result = Calpre - Calafter
      break
    case '+':
      expression = Calpre + '+' + Calafter
      result = Calpre + Calafter
      break
    case 'x':
      expression = Calpre + 'x' + Calafter
      result = Calpre * Calafter
      break
  }

  return {
    expression: expression,
    result: result
  }
}