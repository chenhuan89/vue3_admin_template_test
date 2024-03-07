// 商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
// 引入商品分类接口返回数据类型
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
const useCategoryStore = defineStore('category', {
    state: (): CategoryState => {
        return {
            // 一级分类的数组
            c1Arr: [],
            // 存储一级分类ID
            c1Id: '',
            // 二级分类的数组
            c2Arr: [],
            // 储存二级分类ID
            c2Id: '',
            // 三级分类的数组
            c3Arr: [],
            // 储存三级分类ID
            c3Id: ''
        }
    },
    actions: {
        // 获取商品一级分类的数据
        async getC1() {
            //发请求获取一级分类的数据
            const result: CategoryResponseData = await reqC1()
            if (result.code === 200) {
                this.c1Arr = result.data
            }
        },
        // 获取商品二级分类的数据
        async getC2() {
            const result: CategoryResponseData = await reqC2(this.c1Id)
            if (result.code === 200) {
                this.c2Arr = result.data
            }
        },
        async getC3() {
            // 获取商品三级分类的数据
            const result: CategoryResponseData = await reqC3(this.c2Id)
            if (result.code === 200) {
                this.c3Arr = result.data
            }
        }
    },
    getters: {
        // 获取商品分类列表
    }
})

export default useCategoryStore
