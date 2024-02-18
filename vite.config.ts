import { fileURLToPath, URL } from 'node:url'
import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
    // 获取各种环境下对应的变量
    let env = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            vueJsx(),
            VueSetupExtend(),
            createSvgIconsPlugin({
                // 指定图标文件夹路径
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // 指定图标符号id
                symbolId: 'icon-[dir]-[name]'
            }),
            viteMockServe({
                // default
                mockPath: './mock',
                enable: command === 'serve'
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";'
                }
            }
        },
        // 代理跨域
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    // 获取数据的服务器地址
                    target: env.VITE_SERVE,
                    // 需要代理跨域
                    changeOrigin: true,
                    // 路径重写
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
// 解决代理跨域的问题
