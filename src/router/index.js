import Vue from 'vue'
import Router from 'vue-router'
import backstageHome from '../BackstageView/main/home/backstageLogin'
import BHome from '../BackstageView/main/home/index'
import project from '../BackstageView/main/project'
import proDetail from '../BackstageView/main/project/proDetail'
import Admin from '../BackstageView/main/admin'
import User from '../BackstageView/main/user'
import Role from '../BackstageView/main/user/role'
import Menu from '../BackstageView/main/user/menu'
import Task from '../BackstageView/main/task'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../FrontView/login/loginPage')
    },
    {
      path: '/backLogin',
      name: 'BackLogin',
      component: () => import('../BackstageView/backLogin/index')
    },
    {
      path: '/register',
      name: 'Rigister',
      component: () => import('../FrontView/register/register')
    },
    {
      path: '/home',
      name: 'Homepage',
      component: () => import('../FrontView/header/header'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'BackProject',
          component: () => import('../FrontView/main/homepage')
        },
        {
          path: '/projectDetail',
          name: 'ProjectDetail',
          component: () => import('../FrontView/main/projectDetail')
        },
        {
          path: '/donate',
          name: 'Donate',
          component: () => import('../FrontView/main/donate')
        },
        {
          path: '/myDonation',
          name: 'MyDonation',
          component: () => import('../FrontView/main/myDonation')
        },
        {
          path: '/myApplication',
          name: 'MyApplication',
          component: () => import('../FrontView/main/myApplication')
        },
        {
          path: '/application',
          name: 'Application',
          component: () => import('../FrontView/main/application')
        },
        {
          path: '/personalCenter',
          name: 'PersonalCenter',
          component: () => import('../FrontView/main/personalCenter')
        }
      ]
    }, {
      path: '/backHome',
      component: backstageHome,
      redirect: '/bhome',
      children: [
        {
          path: '/bhome',
          name: 'BHome',
          component: BHome
        },
        {
          path: '/backOperator',
          name: 'BackOperator',
          component: () => import('../BackstageView/main/operator')
        },
        {
          path: '/backProject',
          name: 'BackProject',
          component: project
        },
        {
          path: '/backDetail',
          name: 'BackDetail',
          component: proDetail
        },
        {
          path: '/backAdmin',
          name: 'BackAdmin',
          component: Admin
        },
        {
          path: '/backTask',
          name: 'BackTask',
          component: Task
        },
        {
          path: '/backUser',
          name: 'BackUser',
          component: User
        },
        {
          path: '/backRole',
          name: 'BackUser',
          component: Role
        },
        {
          path: '/backMenu',
          name: 'BackUser',
          component: Menu
        }
      ]
    }
  ]
})

router.afterEach((to, from, next) => {
  document.querySelector('body').setAttribute('style', 'overflow: auto !important;')
})

export default router;
