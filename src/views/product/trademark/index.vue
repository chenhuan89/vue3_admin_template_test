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
                    <template v-slot="scoped">
                        <el-button
                            type="warning"
                            size="small"
                            icon="Edit"
                            @click="updateTradeMark(scoped.row)"
                        ></el-button>
                        <el-popconfirm
                            :title="`确认删除品牌名称:${scoped.row.tmName}?`"
                            width="250px"
                            icon="Delete"
                            icon-color="red"
                            @confirm="removeTradeMark(scoped.row.id)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
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
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改商品' : '添加商品'">
            <el-form :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请你输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <!-- 
                        el-upload 组件上传图片
                        action 属性设置上传图片的地址 代理服务器需要带上/api
                        :show-file-list 属性设置是否显示上传图片的列表
                        :on-success 属性设置上传图片成功后的回调函数
                        :before-upload 属性设置上传图片前的回调函数
                    -->
                    <el-upload
                        class="avatar-uploader"
                        action="/api/admin/product/fileUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <UploadFilled />
                        </el-icon>
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
import { ref, onMounted, reactive, nextTick } from 'vue'
//引入商品管理api
import { reqHasTradeMark, reqAddOrUpdateTradeMark, reqDeleteTradeMark } from '@/api/product/trademark'
import { ElMessage } from 'element-plus'
// 引入商品管理ts类型
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
// 引入element组件类型
import type { UploadProps, FormRules } from 'element-plus'
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
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
// 获取el-from组件实例
let formRef = ref()
// 获取已有品牌数据接口,在任何情况下获取数据,调用此函数即可
const getHasTradeMark = async (pager = 1) => {
    // 设置当前页码
    pageNo.value = pager
    // 发起请求
    let result: TradeMarkResponseData = await reqHasTradeMark(pageNo.value, limit.value)
    // 打印结果
    // console.log(result)
    // 判断请求是否成功
    if (result.code == 200) {
        // 设置总页数
        total.value = result.data.total
        // 设置商标数组
        trademarkArr.value = result.data.records
    }
}
//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
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
    getHasTradeMark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    // 数据清空
    trademarkParams.id = undefined
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    // 第一种写法
    // formRef?.value?.resetFields()
    // 第二种写法
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
}
//修改已有品牌按钮的回调
// row:即为当前已有品牌
const updateTradeMark = async (row: TradeMark) => {
    // 清空校验规则错误提示信息
    formRef?.value?.resetFields()
    // 打开对话框
    dialogFormVisible.value = true
    // ES6语法,将row的属性值赋值给trademarkParams
    Object.assign(trademarkParams, row)
}
// 对话框底部取消按钮的回调
const cancel = () => {
    // 关闭对话框
    dialogFormVisible.value = false
    // 数据清空
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
}
// 对话框底部确定按钮的回调
const confirm = async () => {
    // 在发表单之前,要对整个表单进行校验
    // 调用此方法进行全部表单项校验,如果校验成功则返回true,否则返回false
    await formRef?.value.validate()
    // 关闭对话框
    let result: any = await reqAddOrUpdateTradeMark(trademarkParams)
    // 添加品牌|修改品牌
    if (result.code === 200) {
        // 关闭对话框
        dialogFormVisible.value = false
        // 弹出提示信息
        ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
        // 获取品牌数据
        getHasTradeMark(trademarkParams.id ? pageNo.value : 1)
    } else {
        // 添加品牌失败
        ElMessage.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败')
        dialogFormVisible.value = false
    }
}
// 上传图片组件-->上传图片之前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // console.log(rawFile)
    // 钩子在图片上传之前触发,上传文件之前可以约束文件类型与大小
    // 判断文件类型是否是JPG|PNG|gif|webp类型
    if (
        rawFile.type == 'image/jpeg' ||
        rawFile.type == 'image/png' ||
        rawFile.type == 'image/gif' ||
        rawFile.type == 'image/webp'
    ) {
        // 判断文件大小是否超过4M
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        }
        ElMessage.error('上传的图片大小不能超过4M!')
        return false
    } else {
        ElMessage.error('上传的图片必须是JPG或PNG或GIF格式!')
        return false
    }
}
// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    // response上传成功之后服务器返回的数据
    // uploadFile上传的文件
    trademarkParams.logoUrl = response.data
    // 图片上传成功,清除掉图片校验结果
    formRef?.value?.clearValidate('logoUrl')
}
// 品牌名称自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
    // 自定义校验规则
    // 品牌名称最小大于2位,
    if (value.length >= 2) {
        callBack()
    } else {
        // 校验失败,返回的错误提示信息
        callBack(new Error('品牌名称长度必须大于2位'))
    }
}
// 品牌Logo自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    // 自定义校验规则
    // 品牌Logo地址不能为空
    if (value) {
        callBack()
    } else {
        // 校验失败,返回的错误提示信息
        callBack(new Error('Logo图片务必上传'))
    }
}
// 表单校验
const rules = reactive<FormRules>({
    // required:这个字段务必校验,表单前面出来五角星
    // message: 提示信息
    // trigger: 代表校验规则时机[blur:失去焦点时校验,change:选择完时校验]
    tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
    logoUrl: [{ required: true, validator: validatorLogoUrl }]
})
// 气泡确认框按钮回调
const removeTradeMark = async (id: number) => {
    // 点击确认按钮删除已有品牌请求
    let result = await reqDeleteTradeMark(id)
    if (result.code == 200) {
        // 提示信息
        ElMessage.success('删除成功')
        // 删除成功,重新获取品牌列表数据
        getHasTradeMark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage.error('删除失败')
    }
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
