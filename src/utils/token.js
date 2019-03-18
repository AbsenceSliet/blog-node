'use strict'

import {
    TOKEN
}
from '@/constants/auth'

const isLogin = url => {
    return url && url == '/admin'
}
const setToken = (token) => {
    return localStorage.setItem(TOKEN, token)
}
const getToken = () => {
    return localStorage.getItem(TOKEN)
}
const removeToken = () => {
    return localStorage.removeItem(TOKEN)
}
const checkToken = () => {
    const token = getToken()
    return token && token.split('.').length === 3
}
export default {
    checkToken,
    isLogin,
    setToken,
    getToken,
    removeToken
}