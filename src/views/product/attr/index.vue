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
            <el-table border :data="attrArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" align="center" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称" align="center">
                    <template v-slot="scoped">
                        <el-tag v-for="item in scoped.row.attrValueList" :key="item.id">
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px" align="center">
                    <template v-slot="scoped">
                        <el-button type="warning" size="small" icon="Edit"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入组合是api函数watch
import { watch, ref } from 'vue'
// 引入获取已有属性与属性值接口
import { reqAttr } from '@/api/product/attr'
// 引入已有属性及属性值数据ts类型
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
// 获取分类的仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
// 存储已有的属性与属性值
const attrArr = ref<Attr[]>([])
// 监听仓库三级分类id的变化
watch(
    () => categoryStore.c3Id,
    () => {
        // 清空上一次查询的属性与属性值
        attrArr.value = []
        // 确保三级分类ID存在才能发送请求
        if (!categoryStore.c3Id) return
        // 获取分类ID
        getAttr()
    }
)
// 获取已有的属性与属性值的方法
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)

    if (result.code === 200) {
        attrArr.value = result.data
    }
}
</script>

<style lang="scss" scoped>
.attr_low {
    .el-card {
        margin: 10px 0;

        .el-table {
            margin: 10px 0;

            .el-tag {
                margin: 5px;
            }
        }
    }
}
</style>
