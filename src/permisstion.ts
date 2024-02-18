// 路由鉴权文件
// 引入路由对象
import router from '@/router'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关小仓库内部token数据,判断用户是否登录成功
import useUserStore from './store/modules/user'
//引入大仓库
import pinia from './store'
const userStore = useUserStore(pinia)

//引入项目全局设置
import setting from '@/setting'
// 全局守卫:项目当中任意路由切换都会触发的钩子
//全局的前置守卫
router.beforeEach(async (to, from, next) => {
    document.title = `${setting.title}-<${to.meta.title}>`
    //访问某一个路由之前的守卫
    // to:要访问的路由信息
    // from:从哪来的路由信息
    // next:是一个函数,表示放行,next()放行,next('/login')强制跳转
    nprogress.start() // 开启进度条
    //获取token,判断用户是否登录
    const token = userStore.token
    // 获取仓库当中用户的信息
    const username = userStore.username

    if (token) {
        //用户已登录
        if (to.path === '/login') {
            // 登录成功,访问login不能访问,指向首页
            next({ path: '/' })
        } else {
            // 登录成功访问其余的路由(登录排除)
            if (username) {
                // 有用户信息放行
                next()
            } else {
                // 没有用户信息,在守卫这里发请求获取用户信息
                try {
                    //获取用户信息
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    // token过期获取不到用户信息
                    // 用户手动修改信息
                    await userStore.userLogOut()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        //用户未登录
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } }) // 登录成功后重定向到该地址)
        }
    }
})

// 全局的后置守卫
router.afterEach((to, from) => {
    nprogress.done() // 关闭进度条
})

// 第一个问题:任意路由切换实现进度条业务
// 第二个问题:路由鉴权(路由组件访问权限的设置)
// 全部路由组件:登录/404/任意路由/首页/数据大屏/权限管理(3个子路由)/商品管理(4个子路由)

// 用户未登录:可以访问login,其余都不可以访问(重新指向login)
// 用户登录成功:不可以访问login(指向首页),其余的路由可以访问
