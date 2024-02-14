<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo />
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="$base-menu-background" text-color="white" :default-active="$route.path">
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <!-- layoute组件顶部导航组件 -->
            <Tabbar />
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <Main />
        </div>
    </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router'
//引入Logo子组件
import Logo from './logo/index.vue'
//引入动态菜单组件
import Menu from './menu/index.vue'
// 引入右侧内容展示区
import Main from './main/index.vue'
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
//获取用户相关的小仓库
import useMainStore from '@/store/modules/user'
let userStore = useMainStore()
//获取路由对象实例
let $route = useRoute()
console.log($route.path)
</script>
<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            color: white;

            .el-menu {
                border-right: none;
            }
        }
    }
    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0;
        left: $base-menu-width;
        // border-radius: 10px;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background: yellowgreen;
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        overflow: auto;
        // border-radius: 10px;
    }
}
</style>
