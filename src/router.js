import Vue from 'vue'
import Router from 'vue-router'
import APHome from './views/APHome'
import APDetail from './views/APDetail'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: APHome
    },
    {
      path: '/',
      name: 'home',
      component: APHome
    },
    {
      path: '/ap/:id',
      name: 'apdetail',
      component: APDetail
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
