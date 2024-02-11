<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden">
                <template #title>
                    <span>标&nbsp;___</span>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由且只有一个子路由 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item
                :index="item.children[0].path"
                v-if="!item.children[0].meta.hidden"
            >
                <template #title>
                    <span>标&nbsp;___</span>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由且有多个子路由 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归调用-->
            <Menu :menuList="item.children" />
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Menu'
}
</script>
<style lang="scss" scoped></style>
