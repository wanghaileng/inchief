import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入二charts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//引入iview UI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';   // 使用 CSS
Vue.use(ElementUI);
//重置样式
import './assets/styles/comm.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
