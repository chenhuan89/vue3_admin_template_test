//封装本地存储数据与读取数据的方法
//本地存储数据
export const SET_TOKEN = (token: string) => {
    return localStorage.setItem('TOKEN', token)
}
//本地获取数据
export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN')
}

// 本地存储删除的方法
export const REMOVE_TOKEN = () => {
    return localStorage.removeItem('TOKEN')
}
