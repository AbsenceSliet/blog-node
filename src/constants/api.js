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

//创建文章
export const createarticle = data => service({
    url: '/api/article/create',
    method: 'post',
    data
})

//获取文章列表
export const articlelist = () => service({
    url: '/api/article/articlelist',
    method: 'get'
})

//创建分类 
export const createcategory = data => service({
    url: '/api/category/create',
    method: 'post',
    data
})

//获取分类
export const categorylist = data => service.get('/api/category/categorylist', { params: data })

//更新分类
export const updatecategory = data => service({
    url: '/api/category/update',
    method: 'post',
    data
})

//删除分类
export const deletecategory = data => service.get('/api/category/delete', {
    params: data
})