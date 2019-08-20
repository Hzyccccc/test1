/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
import _ from 'lodash'

let time = 3  //提示框倒计时
let play = null  //定时器
let messBtn = true
let messs = _.throttle(function(that, cont, error) {
  /*未登录*/
  clearInterval(play)
  play = setInterval(() => {
    time--
    messBtn = false
    if (time <= 0) {
      messBtn = true
      clearInterval(play)
      time = 3
    }
  }, 1000)
  if (!messBtn) {
    return
  }
  if (!cont) {
    return
  }
  if (error == '200') {
    that.$message.success(cont)
  } else if (error == '55555' || error == '59999') {
    // console.log(error)
    that.$message.error(cont)
    that.$cookies.remove('zdzwInfo')
    that.$store.state.loginInfo = {}
    setTimeout(() => {
      that.$router.push({ path: '/user/login', query: { type: 1 } })
    }, 2000)
  } else if (error == '5217') {
    that.$message.error(cont)
    setTimeout(() => {
      that.$router.push({ path: '/' })
    }, 2000)
  } else if (error == '30006') {

  } else {
    /*错误信息提示*/
    that.$message.error(cont)
  }
}, 2000, { 'trailing': false })

export function message(that, cont, error) {
  /*公共弹框*/
  messs(that, cont, error)
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function cleardata(data) {
  Object.keys(data).map((key) => {
    data[key] = ''
  })
  return data
}

export default {

  getSTime1(val) {
    let date = new Date(Date.parse(val))
    return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  }
}



