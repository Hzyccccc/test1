import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 页面加载的进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getUser } from '@/utils/auth' // 获取用户登录信息
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 加载进度条的配置

const whiteList = ['/login'] // 免登陆白名单

router.beforeEach(async(to, from, next) => {
  // 进度条开始加载
  NProgress.start()

  // 设置meta头部 title
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已经登录
  const hasLogin = getUser()

  if (hasLogin) {
    if (to.path === '/login') {
      // 如果已经登录 重定向进入首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.userInfo
      if (hasGetUserInfo.userId) {
        next()
      } else {
        try {
          next()
        } catch (error) {
          // 转到登录页重新登录
          await store.dispatch('user/resetUserInfo')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // /* 未登录*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中 直接进入页面
      next()
    } else {
      // 登录后重定向至当前页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
