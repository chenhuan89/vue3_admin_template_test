<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcumb />
        </div>
        <div class="tabbar_right">
            <Setting />
        </div>
    </div>
</template>

<script setup lang="ts" name="Tabbar">
import Breadcumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss">
.tabbar {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to right, #e0e0e0, #ccc, #afb0c0);
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right {
        display: flex;
        align-items: center;
        img {
            margin: 0px 15px;
        }
    }
}
</style>
