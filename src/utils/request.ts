import axios from 'axios'
import { ElMessage } from 'element-plus'
//创建axios 实例

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_API, //基础路径
  timeout: 5000
})
//请求拦截器
request.interceptors.request.use((config) => {
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 400:
        msg = '请求错误'
        break
      case 401:
        msg = '未授权，请登录'
        break
      case 403:
        msg = '拒绝访问'
        break
      case 404:
        msg = '请求地址出错'
        break
      case 408:
        msg = '请求超时'
        break
      case 500:
        msg = '服务器内部错误'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
    return Promise.reject(error)
  }
)
export default request
