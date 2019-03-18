import router from './router'
import { hasPermission, store } from './store'
import { Message } from 'element-ui'
import { checkToken } from '@utils/token'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    if (checkToken) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            if (store.getters.roles.length == 0) {
                store.dispatch('GetUserInfo').then(res => {
                    let roles = res.result.roles

                    // 动态生成路由表
                    store.dispatch('GenerateRoutes', { roles }).then(() => {
                        router.addRoutes(store.getters.addRoutes)
                        next({...to, replace: true })
                    }).catch(error => {
                        store.dispatch('FedLogOut').then(() => {
                            Message.error(error)
                            next({ path: '/' })
                        })
                    })
                })
            } else {
                if (hasPermission(store.getters.roles, to.meta.roles)) {
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