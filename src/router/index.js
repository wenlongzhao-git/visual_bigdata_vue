import Vue from 'vue'
import Router from 'vue-router'
import BdiLogin from '@/components/manage/BdiLogin'
import BdiIndex from '@/components/home/BdiIndex'
import HelloWorld from '@/components/HelloWorld'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect : '/login'
    },
    {
      path: '/index',
      name: 'BdiIndex',
      component: BdiIndex
    },
    {
      path: '/login',
      name: 'BdiLogin',
      component: BdiLogin
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
