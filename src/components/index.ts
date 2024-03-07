// 导入SvgIcon组件
import SvgIcon from './SvgIcon/index.vue'
// 导入Pagination组件
import Pagination from './Pagination/index.vue'
// 导入Category组件
import Category from './Category/index.vue'
//引入element-plus-icons
import * as ElIcons from '@element-plus/icons-vue'
import type { App } from 'vue'

const allGlobalComponent: any = { SvgIcon, Pagination, Category }

//对外暴露插件对象
export default {
    //务必叫做install方法
    install(app: App) {
        // 在这里注册全局组件、指令等
        Object.keys(allGlobalComponent).forEach((key: string) => {
            app.component(key, allGlobalComponent[key])
        })
        //将element-plus提供图标注册为全局组件
        for (const [key, component] of Object.entries(ElIcons)) app.component(key, component)
    }
}
