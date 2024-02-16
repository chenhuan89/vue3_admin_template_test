import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库token接口
export interface UserState {
    // token是字符串或者null
    token: string | null
    menuRoutes: RouteRecordRaw[]
    username: string
    avatar: string
}
