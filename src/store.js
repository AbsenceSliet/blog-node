import Vue from 'vue'
import Vuex from 'vuex'
import { login, getuserinfo } from '@/constants/api'
import { setToken, checkToken } from '@/constants/api'
import { Base64 } from 'js-base64';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: { type: Number, default: 1 },
        token: { type: String, default: '' },
        roles: { type: Array, default: [] }
    },
    mutations: {
        SET_STATUS(state, status) {
            state.status = status
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_ROLES(state, status) {
            state.roles = status == 1 ? ['editor'] : ['editor', 'admin']
        }
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login({ userInfo }).then(response => {
                    const data = response.result
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getuserinfo(state.token).then(response => {
                    const data = response.result
                    commit('SET_STATUS', data.userstatus)
                    commit('SET_ROLES', data.userstatus)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})