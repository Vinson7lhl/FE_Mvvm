import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入echarts
import echarts from 'echarts'
import './registerServiceWorker'

// Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
// 将echarts绑定到Vue实例原型对象中，这样就可以通过 this.$Echarts
Vue.prototype.$Echarts = echarts

/**
 * 这里注入store就可以在所有的组建中用this.$store去调用
 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
