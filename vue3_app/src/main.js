import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 插件模块
import plugins from './plugins/pluginTest'
// UI 模块（注意这里是全部模块都会引入，而不是按需引入，如果要按需引入请参考 https://element-plus.gitee.io/#/zh-CN/component/quickstart）
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// const APP = createApp(App)
createApp(App).use(store).use(router).use(ElementPlus, { size: 'small', zIndex: 3000 }).use(plugins).mount('#app')
