//统一管理项目用户相关的接口
import request from '@/utils/request'

import type { loginForm, loginResponseDate, userResponseData } from './type'
//统一管理接口

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}
//对外暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm) => {
    return request.post<any, loginResponseDate>(API.LOGIN_URL, data)
}
//获取用户信息接口
export const reqUserInfo = () => {
    return request.get<any, userResponseData>(API.USERINFO_URL)
}
