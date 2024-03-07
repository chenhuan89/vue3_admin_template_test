// 书写属性相关的API文件
import request from '@/utils/request'
// 引入接口类型
import type { CategoryResponseData } from './type'
// 属性管理模块接口地址
enum API {
    // 获取一级分类接口
    C1_URL = '/admin/product/getCategory1',
    // 获取二级分类接口
    C2_URL = '/admin/product/getCategory2/',
    // 获取三级分类接口
    C3_URL = '/admin/product/getCategory3/'
}

// 获取一级分类接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

// 获取二级分类接口方法
export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id)

// 获取三级分类接口方法
export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
