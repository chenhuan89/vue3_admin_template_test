<template>
  <div>
    <h1>我是APP根组件</h1>
    <h1>新增代码</h1>
  </div>
  <div>
    <el-button type="primary" size="default" :icon="Plus">Default</el-button>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped></style>
