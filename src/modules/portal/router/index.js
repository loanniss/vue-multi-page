import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/modules/portal/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/modules/portal/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/search/base_data',
    children: [{
      path: 'base_data',
      component: () => import('@/modules/portal/views/search/base')
    }]
  },

  {
    path: '/search',
    component: Layout,
    redirect: '/search/base_data',
    name: 'Search',
    meta: { title: '数据查询', icon: 'example' },
    children: [
      {
        path: 'base_data',
        name: 'BaseData',
        component: () => import('@/modules/portal/views/search/base'),
        meta: { title: '酒店基础数据', icon: 'table' }
      },
      {
        path: 'area_data',
        name: 'AreaData',
        component: () => import('@/modules/portal/views/search/area'),
        meta: { title: '区域数据', icon: 'tree' }
      }
    ]
  },

  {
    path: '/hotel_info',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'HotelInfo',
        component: () => import('@/modules/portal/views/hotel/hotel_info'),
        meta: { title: '酒店抓取', icon: 'form' }
      }
    ]
  },

  {
    path: '/hotel_price',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'HotelPrice',
        component: () => import('@/modules/portal/views/hotel/hotel_price'),
        meta: { title: '酒店房价抓取', icon: 'form' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
