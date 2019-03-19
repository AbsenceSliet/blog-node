import Vue from 'vue'
import Vuex from 'vuex'
import { login, getuserinfo } from '@/constants/api'
import { setToken, checkToken, removeToken } from '@/constants/api'
import { Base64 } from 'js-base64';
import { asyncRouterMap, defaultRouterMap } from './router'

Vue.use(Vuex)

export const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

const filtersAsyncRouter = (routes, roles) => {
    let res = []
    routes.map(route => {
        let tmp = {...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                filtersAsyncRouter(route.children, roles)
            } else {
                res.push(tmp)
            }
        }
    })
    return res
}

export default new Vuex.Store({
    state: {
        status: { type: Number, default: 1 },
        token: { type: String, default: '' },
        roles: { type: Array, default: [] },
        routers: { type: Array, default: [] },
        addRouters: { type: Array, default: [] },
    },
    mutations: {
        SET_STATUS(state, status) {
            state.status = status
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_ROLES(state, roles) {
            state.roles = roles
        },
        SET_ROUTERS(state, routers) {
            state.addRouters = routers;
            state.routers = defaultRouterMap.concat(routers)
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    if (response.code == 1) {
                        const data = response.result
                        commit('SET_TOKEN', data.token)
                        setToken(data.token)
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getuserinfo(state.token).then(response => {
                    const data = response.result
                    commit('SET_STATUS', data.userstatus)
                    commit('SET_ROLES', data.roles)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                let accessRouters;
                if (roles.includes('admin')) {
                    accessRouters = asyncRouterMap
                } else {
                    accessRouters = filtersAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessRouters)
                resolve()
            })
        },
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {

            })
        }
    }
})