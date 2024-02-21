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
            <el-table border :data="trademarkArr">
                <el-table-column type="index" label="序号" width="80px" align="center" />
                <el-table-column prop="tmName" label="品牌名称" width="180" align="center">
                    <template v-slot="scoped">
                        <pre style="color: red">{{ scoped.row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO" align="center">
                    <template v-slot="scoped">
                        <img :src="scoped.row.logoUrl" alt="" />
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" />
                <el-table-column prop="updateTime" label="修改时间" align="center" />
                <el-table-column label="品牌操作" align="center">
                    <template v-slot="scoped">
                        <el-button type="warning" size="small" icon="Edit"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
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
                :page-sizes="[3, 5, 10, 20]"
                :background="true"
                layout="prev, pager, next,jumper,->,sizes,total"
                :total="total"
            />
        </el-card>
    </div>
</template>

<script setup lang="ts">
//引入组合式API函数ref,onMounted
import { ref, onMounted } from 'vue'
//引入商品管理api
import { reqHasTradeMark } from '@/api/product/trademark'
// 引入商品管理ts类型
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
//当前页码
let pageNo = ref<number>(1)
//定义每一页展示多少条数据
let limit = ref<number>(3)
//存储已有品牌数据总数
let total = ref<number>(0)
//存储已有品牌的数据
let trademarkArr = ref<Records>([])
const getHasTradeMark = async () => {
    let result: TradeMarkResponseData = await reqHasTradeMark(pageNo.value, limit.value)
    console.log(result)
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
// 组件挂载完毕的钩子
onMounted(() => {
    getHasTradeMark()
})
</script>

<style lang="scss" scoped>
.el-table {
    margin: 10px 0;

    .el-button {
        width: 25px;
        height: 25px;
    }
}

img {
    width: 80px;
    height: 80px;
}
</style>
