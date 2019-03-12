import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([], () => {
    r(require('./views/login'), 'login')
})

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: login
    }]
})