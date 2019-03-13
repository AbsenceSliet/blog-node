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
export default {
    checkToken,
    isLogin
}