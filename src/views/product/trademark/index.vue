<template>
    <div>
        <!-- 卡片顶部添加品牌的按钮 -->
        <el-card class="box-card">
            <el-button type="primary" size="default" icon="Plus" @click="addTraderMark">添加品牌</el-button>
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
                    <template #="{ row, $index }">
                        <el-button type="warning" size="small" icon="Edit" @click="updateTradeMark"></el-button>
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
                @current-change="getHasTradeMark"
                @size-change="getHasTradeMark"
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[3, 5, 10, 20]"
                :background="true"
                layout="prev, pager, next,jumper,->,sizes,total"
                :total="total"
            />
        </el-card>
        <!-- 对话框组件:添加与修改已有品牌的业务使用结构 -->
        <!-- v-model 属性用于控制对话框的显示与隐藏 true显示,false隐藏 -->
        <el-dialog v-model="dialogFormVisible" title="添加品牌">
            <el-form>
                <el-form-item label="品牌名称" label-width="80px">
                    <el-input placeholder="请你输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="80px">
                    <el-upload
                        class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽:footer -->
            <template #footer>
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </template>
        </el-dialog>
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
// 控制对话框显示与隐藏的属性
let dialogFormVisible = ref<boolean>(false)
const getHasTradeMark = async (pager = 1) => {
    pageNo.value = pager
    let result: TradeMarkResponseData = await reqHasTradeMark(pageNo.value, limit.value)
    // console.log(result)
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
onMounted(() => {
    getHasTradeMark()
})
// // 分页器页码发生变化的时候触发回调
// // 对于当前页码发生变化自定义事件,组件pagination父组件回传了数据(当前页码)
// const changePageNo = () => {
//     // 当前页码发生变化重新请求数据
//     getHasTradeMark()
// }
// 当下拉菜单发生变化的时候会触发回调
// const sizeChange = () => {
//     // 当前页码数据量发生变化 重置当前页码
//     pageNo.value = 1
//     // 当前页码发生变化重新请求数据
//     getHasTradeMark()
// }
// 组件挂载完毕的钩子
// 添加品牌按钮的回调
const addTraderMark = () => {
    dialogFormVisible.value = true
}
//修改已有品牌按钮的回调
const updateTradeMark = () => {
    // console.log(row)
    dialogFormVisible.value = true
    // 把当前行的数据赋值给form
}
// 对话框底部取消按钮的回调
const cancel = () => {
    dialogFormVisible.value = false
}
// 对话框底部确定按钮的回调
const confirm = () => {
    // TODO 提交表单数据
    // 关闭对话框
    dialogFormVisible.value = false
}
</script>

<style lang="scss" scoped>
.el-table {
    margin: 10px 0;

    .el-button {
        width: 25px;
        height: 25px;
    }
    img {
        width: 80px;
        height: 80px;
    }
}
.el-dialog {
    .el-form {
        width: 80%;
    }
}
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
