'use strict'

import { TOKEN } from '@/constants/auth'

export const isLogin = url => {
    return url && url == '/admin'
}
export const setToken = (token) => {
    return localStorage.setItem(TOKEN, token)
}
export const getToken = () => {
    return localStorage.getItem(TOKEN)
}
export const removeToken = () => {
    return localStorage.removeItem(TOKEN)
}
export const checkToken = () => {
    const token = getToken()
    return token && token.split('.').length === 3
}