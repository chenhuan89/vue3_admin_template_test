//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseDate } from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入路由
import { constantRoute } from '@/router/routes'
// 创建用户小仓库
const useUserStore = defineStore('user', {
    //小仓库存储数据的地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(), //用户的唯一标识
            menuRoutes: constantRoute, //仓库存储生成菜单需要的数组(路由)
            username: '',
            avatar: ''
        }
    },
    // actions中定义一个setUserInfo方法，用于设置userInfo属性
    // 异步|逻辑
    actions: {
        //用户登录的方法
        async userLogin(data: loginForm) {
            //用户登录的方法
            const result: loginResponseDate = await reqLogin(data)
            //登录请求:成功200->token
            //登录请求:失败201->登录失败错误的信息
            if (result.code === 200) {
                //pinia仓库存储一下token
                this.token = result.data.token as string
                //本地持久存储token
                SET_TOKEN(this.token)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //获取用户信息的方法
        async userInfo() {
            // 获取用户信息存储到仓库当中[用户头像,名称]
            const result = await reqUserInfo()
            if (result.code === 200) {
                //仓库存储用户信息
                this.username = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
                console.log(this.username)
                console.log(this.avatar)
            } else {
                return Promise.reject(new Error('444'))
            }
        }
    },
    getters: {}
})

// 对外暴露useUserStore函数
export default useUserStore
