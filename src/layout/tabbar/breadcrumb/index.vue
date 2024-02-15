<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'" />
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
//获取layout相关的仓库
import useLayoutSettingStore from '@/store/modules/setting'
const LayoutSettingStore = useLayoutSettingStore()

//点击图标的方法
const changeIcon = () => {
    //图标切换
    LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>

<style lang="scss" scoped></style>
