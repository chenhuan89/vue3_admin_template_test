<template>
    <div>
        <!-- 卡片顶部添加品牌的按钮 -->
        <el-card class="box-card">
            <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
            <!-- 表格组件:用于展示已得平台数据 -->
            <!--
                table:border 表格边框
                table-column:label 表头标题
                table-column:width 列宽
                table-column:align 列对齐方式
            -->
            <!-- 表格展示数据 -->
            <el-table style="margin: 10px 0" border>
                <el-table-column label="序号" width="80px" align="center" />
                <el-table-column label="品牌名称" width="180" align="center" />
                <el-table-column label="创建时间" align="center" />
                <el-table-column label="品牌操作" align="center" />
                <el-table-column label="修改时间" align="center" />
            </el-table>
            <!-- 分页器组件
                pagination
                v-model:current-page 设置页码当前页
                v-model:page-size 设置每一个展示数据条数
                page-sizes 用于设置下拉菜单数据
                small 分页器大小
                background 是否带有背景 true
                layout 可以设置子组件布局调整
             -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[100, 200, 300, 400]"
                :background="true"
                layout="prev, pager, next,jumper,->,sizes,total"
                :total="1000"
            />
        </el-card>
    </div>
</template>

<script setup lang="ts">
//引入组合式API函数ref
import { ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页显示数量
let limit = ref<number>(5)
</script>

<style lang="scss" scoped></style>
