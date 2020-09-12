import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index'
// 导入echarts
import echarts from 'echarts'
import './registerServiceWorker'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 第三方iconfont一般用法：即用Unicode/类名,类名是推荐用法！
// import './assets/icon_font/iconfont.css'
// 特别地：第三方iconfont最推荐使用svg —— 未来趋势，可以使用非单一颜色，但需要引入此js，不用引入上面的css，然后在根组件app.vue中写入基本样式即可
// import './assets/icon_font/iconfont.js'
import * as filters from './utils/filter.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 将echarts绑定到Vue实例原型对象中，这样就可以通过 this.$Echarts
Vue.prototype.$Echarts = echarts
// 遍历所有过滤器，并注入全局Vue实例
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
console.log('启动main.js')

/**
 * 这里注入store就可以在所有的组建中用this.$store去调用
 */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')