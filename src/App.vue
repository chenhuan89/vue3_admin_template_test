<template>
  <div>
    <h1 style="margin: 0">测试SVG</h1>
    <br />
    <SvgIcon name="home" />
    <pagination></pagination>
  </div>
</template>

<script setup lang="ts" name="t1">
import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<style lang="scss" scoped>
div {
  h1 {
    color: $base-color;
  }
}
</style>
