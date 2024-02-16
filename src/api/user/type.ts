//登录接口携带参数TS类型
export interface loginForm {
    username: string
    password: string
}
interface dataType {
    token?: string
    message?: string
}

//登录接口返回数据类型
export interface loginResponseDate {
    code: number
    data: dataType
}

interface userInfo {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
}
interface user {
    checkUser: userInfo
}
//定义服务器返回用户信息相关的数据类型
export interface userResponseData {
    code: number
    data: user
}
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

//定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}
