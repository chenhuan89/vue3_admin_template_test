//对外暴露配置路由(常量路由)
export const constantRoute = [
  //配置路由
  {
    //登录界面
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login' // 命名路由
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'home' // 命名路由
  },
  {
    //404路由
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404' // 命名路由
  },
  {
    //任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  }
]
