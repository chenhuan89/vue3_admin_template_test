<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo />
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">457</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <p style="height: 10000px; background: red">我是一个段落</p>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入Logo子组件
import Logo from './logo/index.vue'
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    // border-radius: 10px;
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: cyan;
    top: 0px;
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
