import Vue from 'vue'
import Vuex from 'vuex'
import { login, getuserinfo } from '@/constants/api'
import { setToken, removeToken } from '@/utils/token'
import { asyncRouterMap, defaultRouterMap } from './router'
import Cookies from  "js-cookie"

Vue.use(Vuex)

export const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

const filterAsyncRouter = (routes, roles) => {
    const res = []
    routes.map(route => {
        const tmp = {...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}


export default new Vuex.Store({
    state: {
        status: 1,
        token: '',
        roles: [],
        routers: [],
        addRouters: [],
        sidebar:{
            opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') :true,
            withoutAnimation: false
        },
        device:'desktop',
        language: Cookies.get('language') || 'en',
    },
    getters: {
        permission_routers: state => state.routers,
        sidebar: state => state.sidebar,
        device: state => state.device,
    },
    mutations: {
        TOOGLE_SIDEBAR(state) {
            state.sidebar.opened = !state.sidebar.opened;
            state.sidebar.withoutAnimation = false
            if(state.sidebar.opened){
                Cookies.set('sidebarStatus', 1)
            }else{
                Cookies.set('sidebarStatus', 0)
            }
        },
        CLOSE_SIDEBAR(state, withoutAnimation) {
            state.sidebar.opened = false
            Cookies.set('sidebarStatus', 0)
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        SET_STATUS(state, status) {
            state.status = status
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_LANGUAGE(state, language){
            state.language = language
            Cookies.set('language', language)
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
        setLanguage({ commit }, language){
            commit('SET_LANGUAGE', language)
        },
        toggleSideBar({commit}){
            commit('TOOGLE_SIDEBAR')
        },
        closeSideBar({ commit }, {withoutAnimation}) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    if (response.data.code == 1) {
                        const data = response.data.result
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
                    if (response.data.code == 1) {
                        const data = response.data.result
                        commit('SET_STATUS', data.userstatus)
                        commit('SET_ROLES', data.roles)
                    }
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
                    accessRouters = filterAsyncRouter(asyncRouterMap, roles)
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
        LogOut({ commit }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
})