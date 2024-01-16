// 导入SvgIcon组件
import SvgIcon from './SvgIcon/index.vue'
// 导入Pagination组件
import Pagination from './Pagination/index.vue'
import type { App } from 'vue'

const allGlobalComponent = { SvgIcon, Pagination }

// interface GlobalComponents {
//   [key: string]: Component
// }

//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app: App) {
    // 在这里注册全局组件、指令等
    Object.keys(allGlobalComponent).forEach((key: string) => {
      app.component(key, allGlobalComponent[key])
    })
  }
}
