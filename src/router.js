import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([], () => {
    r(require('@/views/login/login'), 'login')
})
const layout = r => require.ensure([], () => {
    r(require('@/views/layout/index'), 'layout')
})
const unfind = r => require.ensure([], () => {
    r(require('@/views/errorpage/401'), 'unfind')
})
const nofind = r => require.ensure([], () => {
    r(require('@/views/errorpage/404'), 'nofind')
})
const pageindex = r => require.ensure([], () => {
    r(require('@/views/permission/page'), 'pageindex')
})
const directive = r => require.ensure([], () => {
    r(require('@/views/permission/directive'), 'directive')
})
const dashboard = r => require.ensure([], () => {
    r(require('@/views/dashboard/index'), 'dashboard')
})
const charts = r => require.ensure([], () => {
    r(require('@/views/charts/index'), 'charts')
})
const linecharts = r => require.ensure([], () => {
    r(require('@/views/charts/linecharts'), 'linecharts')
})
const mavon = r => require.ensure([], () => {
    r(require('@/views/mavoneditor/index'), 'mavon')
})
const i18n = r => require.ensure([], () => {
    r(require('@/views/i18n-view/index'), 'i18n')
})
const setting = r => require.ensure([], () => {
    r(require('@/views/setting/index'), 'setting')
})
const article = r => require.ensure([], () => {
    r(require('@/views/article/index'), 'article')
})
const createArticle = r => require.ensure([], () => {
    r(require('@/views/article/createArticle'), 'createArticle')
})
const category = r => require.ensure([], () => {
    r(require('@/views/article/category'), 'category')
})
Vue.use(Router)
export const defaultRouterMap = [{
    path: '/',
    redirect: '/dashboard',
    hidden: true
}, {
    path: '',
    component: layout,
    redirect: 'dashboard',
    children: [{
        path: 'dashboard',
        component: dashboard,
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard' }
    }]
}, {
    path: '/login',
    component: login,
    hidden: true
}, {
    path: '/401',
    component: unfind,
    hidden: true
}, {
    path: '/404',
    component: nofind,
    hidden: true
}]

export const asyncRouterMap1 = [{
    path: '/permisson',
    component: layout,
    redrect: '/permisson/index',
    alwaysShow: true,
    meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin', 'editor']
    },
    children: [{
        path: 'page',
        component: pageindex,
        name: 'Pagepermission',
        meta: {
            title: 'pagePermission',
            roles: ['admin']
        }
    }, {
        path: 'directve',
        component: directive,
        name: 'DirectivePermission',
        meta: { title: 'directivePermission' }
    }]
}, {
    path: '/article',
    component: layout,
    redrect: '/article/index',
    meta: {
        title: 'article',
        icon: 'article',
        roles: ['admin']
    },
    children: [{
        path: 'index',
        component: article,
        name: 'articleList',
        meta: {
            title: 'articleList',
            roles: ['admin']
        }
    }, {
        path: 'create',
        component: createArticle,
        name: 'createArticle',
        meta: {
            title: 'createArticle',
            roles: ['admin']
        }
    }, {
        path: 'category',
        component: category,
        name: 'category',
        meta: {
            title: 'category',
            roles: ['admin']
        }
    }]
}, {
    path: '/charts',
    component: layout,
    name: 'Charts',
    redirect: 'noredirect',
    meta: {
        title: 'charts',
        icon: 'chart'
    },
    children: [{
        path: 'index',
        component: charts,
        name: 'MixinCharts',
        meta: {
            title: 'mixinCharts'
        }
    }, {
        path: 'linecharts',
        component: linecharts,
        name: 'LineCharts',
        meta: {
            title: 'lineCharts'
        }
    }]
}, {
    path: '/mavon',
    component: layout,
    redirect: 'noredirect',
    children: [{
        path: 'index',
        component: mavon,
        name: 'Mavon',
        meta: {
            title: 'mavonEditor',
            icon: 'mavon'
        }
    }]
}, {
    path: '/i18n',
    component: layout,
    redirect: 'noredirect',
    children: [{
        path: 'index',
        component: i18n,
        name: 'I18n',
        meta: {
            title: 'i18n',
            icon: 'international'
        }
    }]
}, {
    path: '/setting',
    component: layout,
    redirect: 'noredirect',
    children: [{
        path: 'index',
        component: setting,
        name: 'Setting',
        meta: {
            title: 'setting',
            icon: 'setting'
        }
    }]
}, {
    path: '*',
    redirect: '/404',
    hidden: true
}]
export const asyncRouterMap = [{
    path: '/article',
    component: layout,
    redrect: '/article/index',
    meta: {
        title: 'article',
        icon: 'article',
        roles: ['admin']
    },
    children: [{
        path: 'index',
        component: article,
        name: 'articleList',
        meta: {
            title: 'articleList',
            roles: ['admin']
        }
    }, {
        path: 'create',
        component: createArticle,
        name: 'createArticle',
        meta: {
            title: 'createArticle',
            roles: ['admin']
        }
    }, {
        path: 'category',
        component: category,
        name: 'category',
        meta: {
            title: 'category',
            roles: ['admin']
        }
    }]
}, {
    path: '/i18n',
    component: layout,
    redirect: 'noredirect',
    children: [{
        path: 'index',
        component: i18n,
        name: 'I18n',
        meta: {
            title: 'i18n',
            icon: 'international'
        }
    }]
}, {
    path: '/setting',
    component: layout,
    redirect: 'noredirect',
    children: [{
        path: 'index',
        component: setting,
        name: 'Setting',
        meta: {
            title: 'setting',
            icon: 'setting'
        }
    }]
}, {
    path: '*',
    redirect: '/404',
    hidden: true
}]
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: defaultRouterMap
})