import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Reviews from '@/components/Reviews'
import Movies from '@/components/Movies'
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
      path: '/movies',
      name: 'Movies',
      component: Movies
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