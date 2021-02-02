export default [
  {
    path: '/simple/role/Role',
    name: 'simple_role_Role',
    component: () => import('./roleList')
  },
  // {
  //   path: '/simple/role/add',
  //   name: 'simple_Role_ddd',
  //   component: () => import('./RoleForm')
  // },
  {
    path: '/simple/role/edit',
    name: 'simple_Role_edit',
    component: () => import('./RoleForm')
  },
  // {
  //   path: '/simple/role/display',
  //   name: 'simple_Role_display',
  //   component: () => import('./RoleDisplay')
  // },
  {
    path: '/simple/role/permissionAssignment',
    name: 'simple_Role_permissionAssignment',
    component: () => import('./permissionAssignment')
  }
]
