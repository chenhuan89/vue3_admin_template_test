// 定义品牌返回数据类型

export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

//已有品牌的ts数据类型
export interface TradeMark {
    id?: number
    createTime?: string
    updateTime?: string
    tmName: string
    logoUrl: string
}

//包含全部品牌数据ts类型
export type Records = TradeMark[]

//获取已有全部数据品牌ts类型
export interface TradeMarkResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        orders: any[]
        optimizeCountSql: boolean
        hitCount: boolean
        countId: any
        maxLimit: any
        searchCount: boolean
        pages: number
    }
}
