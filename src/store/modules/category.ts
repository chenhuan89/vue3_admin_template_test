// 商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr'
const useCategoryStore = defineStore('category', {
    state: () => {
        return {
            // 一级分类的数组
            c1Arr: [],
            // 存储一级分类ID
            c1Id: ''
        }
    },
    actions: {
        // 获取商品分类列表
        async getC1() {
            //发请求获取一级分类的数据
            const result: any = await reqC1()
            if (result.code === 200) {
                this.c1Arr = result.data
            }
        }
    },
    getters: {
        // 获取商品分类列表
    }
})

export default useCategoryStore
