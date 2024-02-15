<template>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts" name="layout_main">
import { watch, ref, nextTick } from 'vue'
// 获取Layout设置小仓库
import useLayOutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayOutSettingStore()
// 控制当前组件是否销毁
let flag = ref(true)
// 监听仓库内部数据是否发生变化
watch(
    () => layoutSettingStore.refsh,
    () => {
        // 点击刷新按钮:路由组件销毁
        flag.value = false
        nextTick(() => {
            flag.value = true
        })
    }
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}
.fade-enter-active {
    transition: all 0.3s;
}
.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>
