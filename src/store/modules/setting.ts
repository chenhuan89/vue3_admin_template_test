// 小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'
const useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false, // 用于控制菜单折叠还是收起
            refsh: false // 用于刷新页面
        }
    }
})
export default useLayOutSettingStore
