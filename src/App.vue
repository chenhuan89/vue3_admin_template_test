<template>
  <div>
    <h1>App根组件</h1>
  </div>
</template>

<script setup lang="ts" name="t1">
import { onMounted } from 'vue'
import { reqLogin } from '@/api/user'
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' })
})
</script>

<style lang="scss" scoped>
div {
  h1 {
    color: $base-color;
  }
}
</style>
