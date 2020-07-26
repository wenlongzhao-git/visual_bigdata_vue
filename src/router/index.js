import Vue from 'vue'
import Router from 'vue-router'
import BdiLogin from '@/components/manage/BdiLogin'
import BdiIndex from '@/components/home/BdiIndex'
import BdiRegist from '@/components/manage/BdiRegist'
import Home from '@/components/home/Home'
import Head from '@/components/home/Head'

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
      name: 'Home',
      component: Home
    },
    {
      path: '/head',
      name: 'Head',
      component: Head
    }
  ]
})
