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
        name:'Dashboard',
        meta:{ title: 'dashboard', icon: 'dashboard'}
    }]
}, {
    path: '/login',
    component: login,
    hidden: true
}, {
    path: '/401',
    component: unfind,
    hidden: true
}]

export const asyncRouterMap = [{
    path: '/permisson',
    component: layout,
    redrect: '/permisson/index',
    alwaysShow:true,
    meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin', 'editor']
    },
    children: [{
        path: 'page',
        component: pageindex,
        name:'pagepermission',
        meta: {
            roles: ['admin'],
            title: 'pagePermission'
        }
    }, {
        path: 'directve',
        component: directive,
        name:'directivePermission',
        meta: { title: 'directivePermission' }
    }]
}, {
    path: '/charts',
    component: layout,
    name:'Charts',
    redirect: 'noredirect',
    meta:{
        title: 'charts',
        icon:'chart'
    },
    children: [{
        path: 'index',
        component: charts,
        name: 'ch',
        meta:{
            title:'mixinCharts'
        }
    },{
        path: 'linecharts',
        component: linecharts,
        name: 'line',
        meta:{
            title:'lineCharts'
        }
    }]
},{
    path: '/mavon',
    component: layout,
    redirect: 'noredirect',
    children:[{
        path: 'index',
        component: mavon,
        name: 'mavon',
        meta:{
            title:'mavonEditor',
            icon:'mavon'
        }
    }]
},{
    path: '/i18n',
    component: layout,
    redirect: 'noredirect',
    children:[{
        path: 'index',
        component: i18n,
        name: 'I18n',
        meta:{
            title:'i18n',
            icon:'international'
        }
    }]
}]
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: defaultRouterMap
})