// 品牌管理模块API

import request from '@/utils/request'
// 引入类型
import type { TradeMarkResponseData } from './type'

// 品牌管理模块接口地址

enum API {
    // 获取品牌列表
    TRADEMARK_URL = '/admin/product/baseTrademark/'
}

//获取已有品牌的接口方法
//page:获取第几页---默认第一页
//limit:获取已有品牌的数据
export const reqHasTradeMark = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(`${API.TRADEMARK_URL}${page}/${limit}`)
