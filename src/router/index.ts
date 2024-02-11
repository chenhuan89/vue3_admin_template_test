//通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from '@/router/routes'
//创建路由器
const router = createRouter({
    //路由模式
    // 两种模式可供选择
    // createWebHistory  传统模式
    // createWebHashHistory 哈希模式
    history: createWebHistory(),
    routes: constantRoute,
    //滚动行为
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
})
export default router
