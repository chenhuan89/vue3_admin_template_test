<template>
    <div class="logo">
        <img :src="setting.logo" alt="" v-if="setting.logoHidden" />
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts" name="Logo">
//引入设置标题及logo的配置文件
import setting from '@/setting'
</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }
    p {
        font-size: $base-logo-title-fontSize;
    }
}
</style>
