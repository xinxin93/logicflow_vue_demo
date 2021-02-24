import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LF from '@/components/LF'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LF',
      component: LF
    }
  ]
})
