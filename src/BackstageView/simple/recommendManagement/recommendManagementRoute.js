export default [
  {
    path: '/simple/projectManagement/ProjectManagement',
    component: () => import('./projectList')
  },
  {
    path: '/simple/projectManagement/display',
    component: () => import('./projectDisplay')
  },
  {
    path: '/simple/projectManagement/AssignOperator',
    component: () => import('./assignOperator')
  },
  {
    path: '/simple/projectManagement/selectOperator',
    component: () => import('./selectOperator')
  },
  {
    path: '/simple/projectManagement/Review',
    component: () => import('./projectReview')
  },

]
