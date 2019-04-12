import service from '../config/fetch'
import store from '@/store'

export const login = data => service({
    url: '/api/user/login',
    data,
    method: 'post'
})
export const getuserinfo = data => service({
    url: '/api/user/getuserinfo',
    method: 'get',
    data
})
export const uploadavatar = data => {
    let url = `/api/user/auth/upload/avatar/${store.state.userinfo.admin_id}`
    return service({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}