<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
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
  padding: 15px;
  img {
    width: 35px;
    height: 35px;
  }
  p {
    font-size: $base-logo-title-fontSize;
  }
}
</style>
