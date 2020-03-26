import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
// 引入全局配置css文件
import '@/assets/css/common.css'
// 引入字体图标
import '@/assets/fronts/iconfont.css'
// 配置axios的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在Vue原型中加入$http属性为axios
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
