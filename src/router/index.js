import Vue from 'vue'
import Router from 'vue-router'
import BdiLogin from '@/components/manage/BdiLogin'
import BdiIndex from '@/components/home/BdiIndex'
import BdiRegist from '@/components/manage/BdiRegist'
import BdiHome from '@/components/home/BdiHome'

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
      path: '/regist',
      name: 'BdiRegist',
      component: BdiRegist
    },
    {
      path: '/cancle',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'BdiHome',
      component: BdiHome
    }
  ]
})
