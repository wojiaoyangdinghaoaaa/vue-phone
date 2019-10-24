import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Agreement from '@/components/Agreement'
import NotFind from '@/components/NotFind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/NotFind',
      name: 'NotFind',
      component: NotFind
    }
  ]
})
