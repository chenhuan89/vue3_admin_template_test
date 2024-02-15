<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img src="/logo.png" style="height: 24px; width: 22px" />
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            Admin
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
// 刷新按钮点击回调
const updateRefsh = () => {
    // 切换更新
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}
</script>

<style lang="scss" scoped></style>
