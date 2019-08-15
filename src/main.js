import Vue from 'vue'

import 'normalize.css/normalize.css' // 重置样式

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import auth from './utils/auth' // 从cookie获取令牌

import '@/styles/index.scss' // 全局样式

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 全局权限控制

import axios from './api/table.js'
Vue.prototype.$http = axios

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
Vue.prototype.$auth = auth

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
