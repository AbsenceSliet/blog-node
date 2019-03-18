import router from './router'
import store from './store'
import { checkToken } from '@utils/token'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    if (checkToken) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {}
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})