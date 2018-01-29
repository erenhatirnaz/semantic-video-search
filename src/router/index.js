import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/components/MainPage'
import SearchPage from '@/components/SearchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    }
  ]
})
