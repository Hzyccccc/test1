import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * hidden 是否在侧边栏展示
 * Layout 页面模板
 * 404需放在页面底部
 * 重置路由 resetRouter()
 * mode 模式可改
 * meta title关联页面title标签 icon使用svg
 * 默认路由具有登录权限，permission中设置免登白名单
 */

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'component', affix: true }
    }]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '系统设置',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '用户管理', noCache: true }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '角色管理', noCache: true }
      },
      {
        path: 'menu3',
        component: () => import('@/views/nested/menu3/index'),
        name: 'Menu3',
        meta: { title: '部门管理', noCache: true }
      },
      {
        path: 'menu4',
        component: () => import('@/views/nested/menu4/index'),
        name: 'Menu4',
        meta: { title: '公司管理', noCache: true }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/menu1',
    name: 'settings',
    meta: {
      title: '基础信息',
      icon: 'user'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/settings/menu1/index'),
        name: 'settings-menu1',
        meta: { title: '商品类别', noCache: true }
      },
      {
        path: 'menu2',
        component: () => import('@/views/settings/menu2/index'),
        name: 'settings-menu2',
        meta: { title: '商品管理', noCache: true }
      },
      {
        path: 'menu3',
        component: () => import('@/views/settings/menu3/index'),
        name: 'settings-menu3',
        meta: { title: '仓库管理', noCache: true }
      },
      {
        path: 'menu4',
        component: () => import('@/views/nested/menu2/index'),
        name: 'settings-menu4',
        meta: { title: '供应商管理', noCache: true }
      }
    ]
  },
  {
    path: '/purchaseAdmin',
    component: Layout,
    redirect: '/purchaseAdmin/purchaseOrder',
    name: 'purchaseAdmin',
    meta: {
      title: '采购管理',
      icon: 'user'
    },
    children: [
      {
        path: 'purchaseOrder',
        component: () => import('@/views/purchaseAdmin/purchaseOrder'),
        name: 'purchaseOrder',
        meta: { title: '采购订单', noCache: true }
      },
      {
        path: 'purchaseRK',
        component: () => import('@/views/purchaseAdmin/purchaseRK'),
        name: 'purchaseRK',
        meta: { title: '采购入库', noCache: true }
      },
      {
        path: 'purchaseBack',
        component: () => import('@/views/purchaseAdmin/purchaseBack'),
        name: 'purchaseBack',
        meta: { title: '采购退货', noCache: true }
      },
      {
        path: 'addOrderInfo',
        component: () => import('@/views/purchaseAdmin/addOrderInfo'),
        name: 'addOrderInfo',
        meta: { title: '添加采购订单信息', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/saleAdmin',
    component: Layout,
    redirect: '/saleAdmin/saleOder',
    name: 'saleAdmin',
    meta: {
      title: '销售管理',
      icon: 'user'
    },
    children: [
      {
        path: 'saleOder',
        component: () => import('@/views/saleAdmin/saleOder'),
        name: 'saleOder',
        meta: { title: '销售订单', noCache: true }
      },
      {
        path: 'saleOderOut',
        component: () => import('@/views/saleAdmin/saleOderOut'),
        name: 'saleOderOut',
        meta: { title: '销售出库', noCache: true }
      },
      {
        path: 'saleOderBack',
        component: () => import('@/views/saleAdmin/saleOderBack'),
        name: 'saleOderBack',
        meta: { title: '销售退货', noCache: true }
      },
      {
        path: 'addOrderInfo',
        component: () => import('@/views/saleAdmin/addOrderInfo'),
        name: 'addOrderInfo',
        meta: { title: '添加采购订单信息', noCache: true },
        hidden: true
      }
    ]
  },
  /*商品类别*/
  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/export-excel',
    name: '商品管理',
    meta: {
      title: '商品管理',
      icon: 'commodity'
    },
    children: [
      {
        path: 'category',
        component: () => import('../views/commodity/category'),
        name: '商品类别',
        meta: { title: '商品类别' }
      },
      {
        path: 'information',
        component: () => import('../views/commodity/information'),
        name: '商品信息',
        meta: { title: '商品信息' }
      },
      {
        path: 'metering',
        component: () => import('../views/commodity/metering'),
        name: '计量单位',
        meta: { title: '计量单位' }
      }
    ]
  },
  /*客户资料*/
  {
    path: '/information',
    component: Layout,
    redirect: '/information/supplier',
    name: '基本资料',
    meta: {
      title: '基本资料',
      icon: 'information'
    },
    children: [
      {
        path: 'supplier',
        component: () => import('../views/information/supplier'),
        name: '供应商信息',
        meta: { title: '供应商信息' }
      },
      {
        path: 'customer',
        component: () => import('../views/information/customer'),
        name: '客户信息',
        meta: { title: '客户信息' }
      },
      {
        path: 'member',
        component: () => import('../views/information/member'),
        name: '会员信息',
        meta: { title: '会员信息' }
      },
      {
        path: 'warehouse',
        component: () => import('../views/information/warehouse'),
        name: '仓库信息',
        meta: { title: '仓库信息' }
      },
      {
        path: 'budget',
        component: () => import('../views/information/budget'),
        name: '收支项目',
        meta: { title: '收支项目' }
      },
      {
        path: 'settlement',
        component: () => import('../views/information/settlement'),
        name: '结算项目',
        meta: { title: '结算项目' }
      },
      {
        path: 'handle',
        component: () => import('../views/information/handle'),
        name: '经手人管理',
        meta: { title: '经手人管理' }
      }
    ]
  },
  /*财务管理*/
  {
    path: '/finance',
    component: Layout,
    redirect: '/commodity/export-excel',
    name: '财务管理',
    meta: {
      title: '财务管理',
      icon: 'finance'
    },
    children: [
      {
        path: 'category',
        component: () => import('../views/commodity/category'),
        name: '商品类别',
        meta: { title: '商品类别' }
      },
      {
        path: 'information',
        component: () => import('../views/commodity/information'),
        name: '商品信息',
        meta: { title: '商品信息' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
