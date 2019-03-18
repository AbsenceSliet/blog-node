import service from '../config/fetch'

export const login = data => service({
    url: '/admin/login',
    data,
    method: 'post'
})
export const getuserinfo = () => service({
    url: '/admin/getuserinfo',
    method: 'get'
})