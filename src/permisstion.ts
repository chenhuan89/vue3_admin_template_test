// 路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
// 全局守卫:项目当中任意路由切换都会触发的钩子
//全局的前置守卫
router.beforeEach((to, from, next) => {
    //访问某一个路由之前的守卫
    // to:要访问的路由信息
    // from:从哪来的路由信息
    // next:是一个函数,表示放行,next()放行,next('/login')强制跳转
    nprogress.start() // 开启进度条
    next()
})

// 全局的后置守卫
router.afterEach((to, from) => {
    nprogress.done() // 关闭进度条
})

//第一个问题:任意路由切换实现进度条业务
