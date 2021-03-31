import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LF from '@/components/LF'
import TurboAdpter from '@/components/TurboAdpter'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LF',
      component: LF
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/TurboAdpter',
      name: 'TurboAdpter',
      component: TurboAdpter
    }
  ]
})
