import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueRouter from 'vue-router'
Vue.prototype.axios = axios;
// 关于网址w.h.替换成宽高的过滤器
// Vue.filter('setWh',(url,arg)=>{
//   return url.replace(/w\.h/,arg);
// });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
