<template>
    <div class="attr_up">
        <!-- 三级分类全局组件 -->
        <Category :scene="scene" />
    </div>
    <div class="attr_low">
        <el-card>
            <div v-show="scene === 0">
                <el-button @click="addAttr" type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">
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
                            <el-button type="warning" size="small" icon="Edit" @click="updateAttr"></el-button>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene === 1">
                <!-- 展示添加属性与修改数据的结构 -->
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus">添加属性值</el-button>
                <el-button @click="cancel">取消</el-button>
                <el-table border>
                    <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>
                <el-button type="primary" size="default">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>
<!-- p69 -->
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
// 定义卡片组件内容切换的变量
//scene=0,显示table,scene=1,显示添加属性与属性值
let scene = ref<number>(0)
// 监听仓库三级分类id的变化
watch(
    () => categoryStore.c3Id,
    () => {
        scene.value = 0
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

// 添加属性按钮的回调
const addAttr = () => {
    // 切换为添加与修改场景
    scene.value = 1
}
// table表格修改已有属性按钮的回调
const updateAttr = () => {
    scene.value = 1
}
// 取消按钮的回调
const cancel = () => {
    scene.value = 0
}
</script>

<style lang="scss" scoped>
.el-card {
    margin: 10px 0;

    .el-table {
        margin: 10px 0;

        .el-tag {
            margin: 5px;
        }
    }
}
</style>
