import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Idol from '@/components/Idol'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/idol/:label',
      name: 'Idol',
      component: Idol,
      props: true
    }
  ]
})
