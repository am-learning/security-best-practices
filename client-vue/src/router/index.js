import Vue from 'vue'
import Router from 'vue-router'
import Reviews from '@/components/Reviews'
import Login from '@/components/Login'
import UserDetails from '@/components/UserDetails'


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews
    },
    {
      path: '/user-details',
      name: 'UserDetails',
      component: UserDetails
    }
  ]
})


Vue.use(Router)
export default router