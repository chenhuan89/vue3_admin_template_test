//对外暴露配置路由(常量路由)
export const constantRoute = [
    //配置路由
    {
        //登录界面
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login', // 命名路由
        meta: {
            title: '登录', //菜单需要的标题
            hidden: true // 是否在菜单中隐藏 true:隐藏,false:不隐藏
        }
    },
    {
        //登录成功以后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout', // 命名路由
        meta: {
            title: 'layout',
            hidden: false // 是否在菜单中隐藏 true:隐藏,false:不隐藏
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                }
            }
        ]
    },
    {
        //404路由
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404', // 命名路由
        meta: {
            title: '404',
            hidden: true // 是否在菜单中隐藏 true:隐藏,false:不隐藏
        }
    },
    {
        //任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            title: '任意路由',
            hidden: true // 是否在菜单中隐藏 true:隐藏,false:不隐藏
        }
    }
]
