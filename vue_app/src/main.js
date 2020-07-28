import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

/**
 * 这里注入store就可以在所有的组建中用this.$store去调用
 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
