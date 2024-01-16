<template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>

<script setup lang="ts" name="t1">
import request from '@/utils/request'
import { onMounted } from 'vue'
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: { username: 'admin', password: '111111' }
  }).then((res) => {
    console.log(res)
  })
})
</script>

<style lang="scss" scoped>
div {
  h1 {
    color: $base-color;
  }
}
</style>
