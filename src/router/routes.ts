//对外暴露配置路由(常量路由)
export const constantRoute = [
    //配置路由
    {
        //登录界面
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'Login', // 命名路由
        meta: {
            title: '登录', //菜单需要的标题
            hidden: true, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
            icon: 'Promotion' // 菜单需要的图标
        }
    },
    {
        //登录成功以后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout', // 命名路由
        meta: {
            title: '',
            hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'HomeFilled'
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
            hidden: true, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
            icon: 'Close'
        }
    },
    {
        //数据大屏
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
            icon: 'Histogram'
        }
    },
    {
        //权限管理
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
            icon: 'Lock'
        },
        redirect: '/acl/user', //重定向
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'Acl',
                meta: {
                    title: '用户管理',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'Avatar'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'Menu'
                }
            }
        ]
    },
    {
        //商品管理
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
            icon: 'Goods'
        },
        redirect: '/product/trademark', //重定向
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'ShoppingCartFull'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'InfoFilled'
                }
            },
            {
                path: '/product/SPU',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'Calendar'
                }
            },
            {
                path: '/product/SKU',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    hidden: false, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
                    icon: 'Coin'
                }
            }
        ]
    },
    {
        //任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            title: '任意路由',
            hidden: true, // 是否在菜单中隐藏 true:隐藏,false:不隐藏
            icon: 'ChromeFilled'
        }
    }
]
