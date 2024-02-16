<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" style="height: 24px; width: 22px; border-radius: 50%" />
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="Setting">
// 获取Layout设置小仓库
import useLayOutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayOutSettingStore()
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 刷新按钮点击回调
const updateRefsh = () => {
    // 切换更新
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}
// 全屏按钮点击回调
const fullScreen = () => {
    // 切换全屏
    //dom对象一个属性,可以用来判断当前是否全屏
    // document.fullscreenElement 判断当前是否全屏
    let full = document.fullscreenElement
    if (!full) {
        // document.documentElement.requestFullscreen() 进入全屏
        document.documentElement.requestFullscreen()
    } else {
        // document.exitFullscreen() 退出全屏
        document.exitFullscreen()
    }
}
</script>

<style lang="scss" scoped></style>
