import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import About from '@/components/About'
import FoodDiary from '@/components/FoodDiary'
import Recipes from '@/components/Recipes'
import ShopList from '@/components/ShopList'
import WeeklyMenu from '@/components/WeeklyMenu'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/food-diary',
      name: 'foodDiary',
      component: FoodDiary
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/weekly-menu',
      name: 'WeeklyMenu',
      component: WeeklyMenu
    },
    {
      path: '/shop-list',
      name: 'shopList',
      component: ShopList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
