<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'" />
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包屑动态展示路由名字与标题 -->
        <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            v-show="item.meta.title"
            :to="item.path"
        >
            <!-- 图标 -->
            <el-icon>
                <component :is="item.meta.icon" v-if="item.meta.icon" />
            </el-icon>
            <!-- 面包屑展示匹配路由的标题 -->
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
//获取layout相关的仓库
import useLayoutSettingStore from '@/store/modules/setting'

const LayoutSettingStore = useLayoutSettingStore()

//引入路由对象
import { useRoute } from 'vue-router'

let $route = useRoute()
//点击图标的方法
const changeIcon = () => {
    //图标切换
    LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>

<style lang="scss" scoped>
span {
    margin: 0 5px;
}
</style>
