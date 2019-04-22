import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        hidden: true,
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    hidden: true,
    redirect: '/guide/index',
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    hidden: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    hidden: true,
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    hidden: true,
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    hidden: true,
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    hidden: true,
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    hidden: true,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },
  /**
   *                                                                                                            系统设置
   */
  {
    path: '/system-setup',
    component: Layout,
    redirect: 'system-basic-config',
    name: 'system-setup',
    meta: {
      title: '系统设置',
      icon: 'chart'
    },
    hidden: false,
    children: [
      {
        path: 'basic-config.vue',
        component: () => import('@/pages/system-setup/system-basic-config'),
        name: 'basic-config',
        meta: { title: '基础配置', icon: 'international' }
      },
      {
        path: 'domain-config.vue',
        component: () => import('@/pages/system-setup/domain-config'),
        name: 'domain-config',
        meta: { title: '安全域配置', icon: 'international' }
      },
      {
        path: 'machine-audit.vue',
        component: () => import('@/pages/system-setup/machine-audit'),
        name: 'domain-config',
        meta: { title: '机器审核', icon: 'international' }
      },
      {
        path: 'notice-config.vue',
        component: () => import('@/pages/system-setup/notice-config'),
        name: 'notice-config',
        meta: { title: '通知配置', icon: 'international' }
      }
    ]
  },
  /**
   *                                                                                                            权限管理
   */
  {
    path: '/permissions-manage',
    component: Layout,
    redirect: 'permissions-list',
    name: 'permissions-manage',
    meta: {
      title: '权限管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      {
        path: 'permissions-list.vue',
        component: () => import('@/pages/permissions-manage/permissions-list'),
        name: 'permissions-list',
        meta: { title: '权限列表', icon: 'international' }
      },
      {
        path: 'role-manage.vue',
        component: () => import('@/pages/permissions-manage/role-manage'),
        name: 'role-manage',
        meta: { title: '角色管理', icon: 'international' }
      },
      {
        path: 'admin-manage.vue',
        component: () => import('@/pages/permissions-manage/admin-manage'),
        name: 'admin-manage',
        meta: { title: '管理员管理', icon: 'international' }
      }
    ]
  },
  /**
   *                                                                                                            用户管理
   */
  {
    path: '/user-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'user-manage',
    meta: {
      title: '用户管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      {
        path: 'all-user.vue',
        component: () => import('@/pages/user-manage/all-user'),
        name: 'all-user',
        meta: { title: '所有用户', icon: 'international' }
      },
      {
        path: 'ldap-user.vue',
        component: () => import('@/pages/user-manage/ldap-user'),
        name: 'ldap-user',
        meta: { title: 'ldap用户', icon: 'international' }
      },
      {
        path: 'ordinary-users.vue',
        component: () => import('@/pages/user-manage/ordinary-users'),
        name: 'ordinary-users',
        meta: { title: '普通用户', icon: 'international' }
      },
      {
        path: 'organization-manage.vue',
        component: () => import('@/pages/user-manage/organization-manage'),
        name: 'organization-manage',
        meta: { title: '组织结构管理', icon: 'international' }
      }
    ]
  },
  /**
   *                                                                                                          用户组管理
   */
  {
    path: '/user-group-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'user-group-manage',
    meta: {
      title: '用户组管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      // {
      //   path: 'all-user.vue',
      //   component: () => import('@/pages/user-manage/all-user'),
      //   name: 'all-user',
      //   meta: { title: '所有用户', icon: 'international' }
      // }
    ]
  },
  /**
   *                                                                                                            审核管理
   */
  {
    path: '/review-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'review-manage',
    meta: {
      title: '审核管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      // {
      //   path: 'all-user.vue',
      //   component: () => import('@/pages/user-manage/all-user'),
      //   name: 'all-user',
      //   meta: { title: '所有用户', icon: 'international' }
      // }
    ]
  },
  /**
   *                                                                                                        报表展示管理
   */
  {
    path: '/report-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'report-manage',
    meta: {
      title: '报表展示管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      // {
      //   path: 'all-user.vue',
      //   component: () => import('@/pages/user-manage/all-user'),
      //   name: 'all-user',
      //   meta: { title: '所有用户', icon: 'international' }
      // }
    ]
  },
  /**
   *                                                                                                            审计管理
   */
  {
    path: '/audit-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'audit-manage',
    meta: {
      title: '审计管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      // {
      //   path: 'all-user.vue',
      //   component: () => import('@/pages/user-manage/all-user'),
      //   name: 'all-user',
      //   meta: { title: '所有用户', icon: 'international' }
      // }
    ]
  },
  /**
   *                                                                                                        病毒检测管理
   */
  {
    path: '/virus-detection-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'virus-detection-manage',
    meta: {
      title: '病毒检测管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      // {
      //   path: 'all-user.vue',
      //   component: () => import('@/pages/user-manage/all-user'),
      //   name: 'all-user',
      //   meta: { title: '所有用户', icon: 'international' }
      // }
    ]
  },
  /**
   *                                                                                                        用户文件管理
   */
  {
    path: '/user-file-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'user-file-manage',
    meta: {
      title: '用户文件管理',
      icon: 'chart'
    },
    hidden: false,
    children: [
      // {
      //   path: 'all-user.vue',
      //   component: () => import('@/pages/user-manage/all-user'),
      //   name: 'all-user',
      //   meta: { title: '所有用户', icon: 'international' }
      // }
    ]
  },
  /**
   *                                                                                                          IP限制名单
   */
  {
    path: '/ip-file-manage',
    component: Layout,
    redirect: 'organization-manage',
    name: 'ip-file-manage',
    meta: {
      title: 'IP限制名单',
      icon: 'chart'
    },
    hidden: false,
    children: [
      // {
      //   path: 'all-user.vue',
      //   component: () => import('@/pages/user-manage/all-user'),
      //   name: 'all-user',
      //   meta: { title: '所有用户', icon: 'international' }
      // }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
