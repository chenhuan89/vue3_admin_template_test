//分类相关数据ts数据

export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// 分类ts类型
export interface CategoryObj {
    id: number | string
    name: string
    createTime: string
    updateTime: string
    category1Id?: number
    category2Id?: number
}

//相应的分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}

// 属性与属性值的ts类型
export interface attrValue {
    id?: number | string
    valueName: string
    attrId?: number | string
}

// 存储每个属性值的数组类型
export type attrValueList = attrValue[]

// 属性对象
export interface Attr {
    id?: number | string
    attrName: string
    categoryId: number | string
    categoryLevel: number
    attrValueList: attrValueList
}

// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[]

// 属性接口返回的数据ts类型
export interface AttrResponseData extends ResponseData {
    data: Attr[]
}
