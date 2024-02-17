<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" show-password v-model="loginForm.password" type="password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="Login">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取当前时间的函数
import { getTime } from '@/utils/time'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
//获取el-form组件
let loginForms = ref()
//获取路由器对象
let $router = useRouter()
let $route = useRoute()
//定义变量控制按钮加载效果
let loading = ref(false)
//收集表单数据
let loginForm = reactive({
    username: 'admin',
    password: '111111'
})
//登录按钮的回调
const login = async () => {
    //保证表单验证通过
    await loginForms.value.validate()
    //开启加载效果
    loading.value = true
    //通知仓库发登录请求
    //仓库发请求之后，仓库会返回一个token字符串
    //请求成功->首页展示数据的地方
    //请求失败->提示用户
    try {
        //保证登录成功
        await userStore.userLogin(loginForm)
        //判断登录的时候,路径当中是否有query参数
        let redirect = $route.query.redirect as string
        //登录成功之后,跳转到指定页面
        //如果登录的时候,路径当中没有query参数,那么登录成功之后,跳转到首页
        //如果登录的时候,路径当中有query参数,那么登录成功之后,跳转到query参数所指定的路径
        $router.push({ path: redirect || '/' })
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: `Hi,${getTime()}好`
        })
        //登录成功,取消加载效果
        loading.value = false
    } catch (error) {
        //登录失败
        loading.value = false
        //提示用户
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}
//自定义规则用户名函数
const validatorUsername = (rule: any, value: string, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素的文本内容
    //callback:规则函数 如果符合条件放行,反之注入错误提示信息
    if (value.length < 5 || value.length > 18) {
        //校验失败
        callback(new Error('账号长度必须大于5位小于18位'))
    } else {
        callback()
    }
}
//自定义规则密码函数
const validatorPassword = (rule: any, value: string, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素的文本内容
    //callback:规则函数 如果符合条件放行,反之注入错误提示信息
    if (value.length < 6 || value.length > 18) {
        //校验失败
        callback(new Error('密码长度必须大于6位小于18位'))
    } else {
        callback()
    }
}
//定义表单校验规则函数
const rules = {
    username: [
        // { required: true, min: 5, max: 10, message: '用户名不得少于5位', trigger: 'blur' }
        { trigger: 'change', validator: validatorUsername }
    ],
    password: [{ trigger: 'change', validator: validatorPassword }]
}
//当按下回车键
const keyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        login()
    }
}
//当页面销毁的时候，取消全局事件监听
onUnmounted(() => {
    window.removeEventListener('keydown', keyDown)
})
//页面加载的时候，添加全局事件监听
onMounted(() => {
    window.addEventListener('keydown', keyDown)
})
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: absolute;
        width: 30%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
