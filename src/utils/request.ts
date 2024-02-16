import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'
//创建axios 实例

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use((config) => {
    //获取用户相关的小仓库
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config
})
//响应拦截器
request.interceptors.response.use(
    (response) => {
        //response响应对象,data属性响应体,status属性响应码
        //成功回调,简化数据
        return response.data
    },
    (error) => {
        let message: string
        const { status } = error.response
        switch (status) {
            case 401:
                message = 'token失效,请重新登录'
                break
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message = '网络出现问题'
                break
        }
        ElMessage({
            type: 'error',
            message
        })
        return Promise.reject(error)
    }
)
// 导出request函数
export default request
