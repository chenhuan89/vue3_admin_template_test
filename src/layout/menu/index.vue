<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->

        <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <!-- 添加icon图标 -->
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由且只有一个子路由 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <!-- 添加icon图标 -->
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归调用-->

            <Menu_ :menuList="item.children" />
        </el-sub-menu>
        <!-- 有子路由且有多个子路由 -->

        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <!-- 添加icon图标 -->
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>

<script setup lang="ts">
//引入路由器对下
import { useRouter } from 'vue-router'
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
let $router = useRouter()
//点击菜单的回调
const goRoute = (vc: any) => {
    //路由跳转
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Menu_'
}
</script>
<style lang="scss"></style>
