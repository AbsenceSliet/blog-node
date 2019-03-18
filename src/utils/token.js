'use strict'

import {
    TOKEN
}
from '@/constants/auth'
const checkToken = () => {
    const token = localStorage.getItem(TOKEN)
    return token && token.split('.').length === 3
}
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
export default {
    checkToken,
    isLogin,
    setToken,
    getToken,
    removeToken
}