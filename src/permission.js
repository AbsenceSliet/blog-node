import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { checkToken } from '@/utils/token.js'
// permission judge function
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (checkToken()) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            if (store.state.roles.length == 0) {
                store.dispatch('GetUserInfo').then(res => {
                    let roles = res.data.result.roles

                    // 动态生成路由表
                    store.dispatch('GenerateRoutes', { roles }).then(() => {
                        router.addRoutes(store.state.addRouters)
                        next({...to, replace: true })
                    }).catch(error => {
                        store.dispatch('FedLogOut').then(() => {
                            Message.error(error)
                            next({ path: '/' })
                        })
                    })
                })
            } else {
                if (hasPermission(store.state.roles, to.meta.roles)) {
                    next()
                } else {
                    next({ path: '/401', replace: true, })
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})