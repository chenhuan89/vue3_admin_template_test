// 导入createApp函数，用于创建Vue应用
import { createApp } from 'vue'
// 导入App组件
import App from '@/App.vue'
// 导入ElementPlus
import ElementPlus from 'element-plus'
// 导入ElementPlus的样式文件
import 'element-plus/dist/index.css'
// 导入ElementPlus的中文文件
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 导入虚拟svg图标注册模块
import 'virtual:svg-icons-register'
//引入自定义插件:注册整个项目全局组件
import gloalComponent from '@/components'
// 导入样式文件
import '@/styles/index.scss'
// 导入路由
import router from '@/router'
//引入pinia仓库
import pinia from '@/store'
//引入路由鉴权
import '@/permisstion'
// 创建一个应用实例
const app = createApp(App)
// 使用 ElementPlus 插件，并设置 locale 为 zhCn
app.use(ElementPlus, {
    locale: zhCn
})
//安装自定义插件
app.use(gloalComponent)
//注册路由组件
app.use(router)
//注册仓库组件
app.use(pinia)
// 挂载应用
app.mount('#app')
