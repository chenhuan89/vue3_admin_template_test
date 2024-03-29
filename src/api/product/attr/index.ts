// 书写属性相关的API文件
import request from '@/utils/request'
// 引入接口类型
import type { CategoryResponseData, AttrResponseData, Attr } from './type'

// 属性管理模块接口地址
enum API {
    // 获取一级分类接口
    C1_URL = '/admin/product/getCategory1',
    // 获取二级分类接口
    C2_URL = '/admin/product/getCategory2/',
    // 获取三级分类接口
    C3_URL = '/admin/product/getCategory3/',
    // 获取分类下已有的属性与属性值接口地址
    ATTR_URL = '/admin/product/attrInfoList/',
    // 添加或者修改已有属性的接口地址
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo/'
}

// 获取一级分类接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

// 获取二级分类接口方法
export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id)

// 获取三级分类接口方法
export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
// 获取对应分类下已有的属性与属性值的接口
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) =>
    request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
//新增或者修改已有属性接口
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
