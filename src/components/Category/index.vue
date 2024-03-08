<template>
    <el-card>
        <!-- <span>请选择商品信息</span>
            <el-cascader v-model="value" :options="options" @change="handleChange" /> -->
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change="handlerC1">
                    <!-- option组件
                        label:即为显示的属性 
                        value:即为select下拉菜单收集的数据
                     -->
                    <el-option
                        v-for="c1 in categoryStore.c1Arr"
                        :key="c1.id"
                        :label="c1.name"
                        :value="c1.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change="handlerC2">
                    <el-option
                        v-for="c2 in categoryStore.c2Arr"
                        :key="c2.id"
                        :label="c2.name"
                        :value="c2.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id">
                    <el-option
                        v-for="c3 in categoryStore.c3Arr"
                        :key="c3.id"
                        :label="c3.name"
                        :value="c3.id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup lang="ts">
//引入组件挂载完毕的法法
import { onMounted } from 'vue'
// 引入分类相关仓库
import useCategoryStore from '@/store/modules/category'
//获取分类相关仓库
let categoryStore = useCategoryStore()
// 分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
    //获取一级分类数据
    getC1()
})
//通知仓库获取一级分类的方法
const getC1 = () => {
    // 通知分类仓库发请求获取一级分类的数据
    categoryStore.getC1()
}
// 定义变量接收一级分类数据
const handlerC1 = () => {
    // 当一级分类发生变化清空三级分类数组
    categoryStore.c3Arr = []
    // 清空二级和三级分类的内容
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    // 通知仓库获取二级分类数据
    categoryStore.getC2()
}
// 定义变量接受三级分类数据
const handlerC2 = () => {
    // 当二级分类发生变化清空三级分类内容
    categoryStore.c3Id = ''
    // 通知仓库获取三级分类数据
    categoryStore.getC3()
}
</script>

<style lang="scss" scoped>
.el-select {
    width: 200px;
}
</style>
