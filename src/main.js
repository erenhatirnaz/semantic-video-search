// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'

import './bootstrap'

Vue.config.productionTip = false

const eventBus = new Vue()
let query = {}

Object.defineProperties(Vue.prototype, {
  $bus: {
    get () {
      return eventBus
    }
  },
  $query: {
    get () {
      return query
    },

    set (value) {
      query = value
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
