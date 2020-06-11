import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../mock/index.js'

Vue.config.productionTip = false

import axios from 'axios'

// Vue.prototype.$http = axios.create({
//   baseURL:'http://localhost:3001/api'
// })
Vue.prototype.$http = axios.create() // 实例化一个axios
// Vue.prototype.$http.defaults.baseURL = 'http://localhost:8080/'



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
