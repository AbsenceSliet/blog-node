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
const pageindex = r => require.ensure([], () => {
    r(require('@/views/permission/page'), 'pageindex')
})
const directive = r => require.ensure([], () => {
    r(require('@/views/permission/directive'), 'directive')
})
const dashboard = r => require.ensure([], () => {
    r(require('@/views/dashboard/index'), 'dashboard')
})

Vue.use(Router)
export const defaultRouterMap = [{
    path: '/',
    component: login
}, {
    path: '/dashboard',
    component: layout,
    redirect: '/dashboard/index',
    children: [{
        path: 'index',
        component: dashboard
    }]
}, {
    path: '/401',
    component: unfind
}]

export const asyncRouterMap = [{
    path: '/permisson',
    component: layout,
    redrect: '/permisson/index',
    meta: {
        roles: ['admin', 'editor']
    },
    children: [{
        path: 'page',
        component: pageindex,
        meta: {
            roles: ['admin']
        }
    }, {
        path: 'directve',
        component: directive
    }]
}]
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: defaultRouterMap
})