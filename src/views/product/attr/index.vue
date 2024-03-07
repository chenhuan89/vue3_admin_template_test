<template>
    <div class="attr_up">
        <!-- 三级分类全局组件 -->
        <Category />
    </div>
    <div class="attr_low">
        <el-card>
            <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true">
                添加属性
            </el-button>
            <el-table border>
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" align="center"></el-table-column>
                <el-table-column label="属性值名称" align="center"></el-table-column>
                <el-table-column label="操作" width="120px" align="center"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 获取分类的仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
</script>

<style lang="scss" scoped>
.attr_low {
    .el-card {
        margin: 10px 0;

        .el-table {
            margin: 10px 0;
        }
    }
}
</style>
