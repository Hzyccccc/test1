import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { setUser,getUser } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://172.10.0.39:8018', // 黄兴本地
  // baseURL: 'http://172.10.0.130:8019', //杜远天本地
  baseURL: 'http://172.10.0.26:8019', //周武本地

  timeout: 60000, // request timeout
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    if (config.type) {
      if (config.type === 'encodeURIPost') {
        config.transformRequest = [function(data) {
          console.log('###########')
          console.log(data)
          console.log('###########')
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }
    console.log('------')
    console.log(store.getters.userInfo)
    console.log(getUser() ? JSON.parse(getUser()).token : '')
    console.log('------')
    if (store.getters.userInfo) {
      config.headers['X-Token'] = getUser() ? JSON.parse(getUser()).token : ''
    }
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    console.log('报错')

    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
    // if the custom code is not 20000, it is judged as an error.
    /*if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetUserInfo').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }*/

  },
  error => {
    console.log(error.code)

    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message.error({ message: '请求超时!' })
    } else {
      if (error.response.status === 504 || error.response.status === 404) {
        Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
      } else if (error.response.status === 403) {
        Message.error({ message: '权限不足,请联系管理员!' })
      } else if (error.response.status === 401) {
        Message.error({ message: error.response.data.message })
      } else {
        if (error.response.data.message) {
          Message.error({ message: error.response.data.message })
        } else {
          Message.error({ message: '未知错误!' })
        }
      }
    }
    return Promise.reject(error)
  }
)

export default service
