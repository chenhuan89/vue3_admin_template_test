<template>
    <el-card>
        <!-- <span>请选择商品信息</span>
            <el-cascader v-model="value" :options="options" @change="handleChange" /> -->
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select :model-value="categoryStore.c1Id">
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
            <!-- <el-form-item label="二级分类">
                <el-select>
                    <el-option label="123"></el-option>
                    <el-option label="457"></el-option>
                    <el-option label="888"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select>
                    <el-option label="123"></el-option>
                    <el-option label="457"></el-option>
                    <el-option label="888"></el-option>
                </el-select>
            </el-form-item> -->
        </el-form>
    </el-card>
</template>
<!-- 视频65p 18:35 -->
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
</script>

<style lang="scss" scoped>
.el-select {
    width: 200px;
}
</style>
