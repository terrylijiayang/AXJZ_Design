import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../FrontView/login/loginPage')
    },
    {
      path: '/register',
      name: 'Rigister',
      component: () => import('../FrontView/register/register')
    },
    {
      path: '/homepage',
      name: 'Homepage',
      component: () => import('../FrontView/main/homepage'),
    },
    {
      path: '/projectDetail',
      name: 'ProjectDetail',
      component: () => import('../FrontView/main/projectDetail'),
    },
    {
      path: '/myDonation',
      name: 'MyDonation',
      component: () => import('../FrontView/main/myDonation'),
    },
    {
      path: '/application',
      name: 'Application',
      component: () => import('../FrontView/main/application'),
    },
    {
      path: '/donate',
      name: 'Donate',
      component: () => import('../FrontView/main/donate'),
    },
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: () => import('../FrontView/main/personalCenter'),
    },
    {
      path: '/myApplication',
      name: 'MyApplication',
      component: () => import('../FrontView/main/myApplication'),
    },
})
