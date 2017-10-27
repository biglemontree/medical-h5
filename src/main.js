// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/init.js'

import {apis} from './utils/config.js'

console.log(apis)
Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$apis = apis

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
