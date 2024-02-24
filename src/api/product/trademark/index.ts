// 品牌管理模块API

import request from '@/utils/request'
// 引入类型
import type { TradeMarkResponseData, TradeMark } from './type'

// 品牌管理模块接口地址

enum API {
    // 获取品牌列表
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    // 添加品牌
    ADDTRDEMARK_URL = '/admin/product/baseTrademark/save',
    // 修改已有品牌
    UPDATETRDEMARK_URL = '/admin/product/baseTrademark/update'
}

//获取已有品牌的接口方法
//page:获取第几页---默认第一页
//limit:获取已有品牌的数据
export const reqHasTradeMark = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(`${API.TRADEMARK_URL}${page}/${limit}`)

//添加与修改已有品牌的接口方法
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
    //如果tradeMark有id属性，则是修改已有品牌，否则为添加已有品牌
    if (data.id) {
        //修改品牌
        // return request.put<any, any>(`${API.UPDATETRDEMARK_URL}${data.id}`, data)
        return request.put<any, any>(API.UPDATETRDEMARK_URL, data)
    } else {
        //新增品牌
        // return request.post<any, any>(`${API.ADDTRDEMARK_URL}`, data)
        return request.post<any, any>(API.ADDTRDEMARK_URL)
    }
}
