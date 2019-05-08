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
    url: '/api/auth/article/create',
    method: 'post',
    data
})

//获取文章列表
export const articlelist = data => service({
    url: '/api/auth/article/articlelist',
    method: 'get',
    params: data
})

//获取文章数量
export const articlecount = () => service({
    url: '/api/auth/article/articlecount',
    method: 'get'
})

//获取文章详情
export const articledetail = id => service({
    url: `/api/auth/article/getarticledeatil/${id}`,
    method: 'get'
})

//更新文章内容
export const updatearticle = data => service({
    url: '/api/auth/article/update',
    method: 'post',
    data
})

//删除文章
export const deletearticle = id => service({
    url: `/api/auth/article/delete/${id}`,
    method: 'get'
})

//创建分类 
export const createcategory = data => service({
    url: '/api/auth/category/create',
    method: 'post',
    data
})

//获取分类
export const categorylist = data => service.get('/api/auth/category/categorylist', {
    params: data
})

//更新分类
export const updatecategory = data => service({
    url: '/api/auth/category/update',
    method: 'post',
    data
})

//删除分类
export const deletecategory = id => service.get(`/api/auth/category/delete/${id}`)