<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
  //xlink:href的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  //图标的名称
  name: String,
  //图标的颜色
  color: {
    type: String,
    default: ''
  },
  //图标的大小
  width: {
    type: String,
    default: '16px'
  },
  //图标的高度
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style lang="scss" scoped></style>
