// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import store from './store/index.js'

import App from './App'
import router from './router'

import './utils/init.js'

import {apis} from './utils/config.js'

Vue.config.productionTip = false



/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

