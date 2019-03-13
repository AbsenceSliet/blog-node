import { baseUrl } from './env'
import { TOKEN_HEADER, TOKEN } from '@/constants/auth'
import axios from 'axios'
import router from '../router'

const service = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

service.interceptors.request.use(
    config => {
        console.log(config, 'request')
        let { headers } = config;
        let token = localStorage.getItem(TOKEN)
        Object.assign(headers, { TOKEN_HEADER: `Bearer ${token}` })
        return config
    }, error => {
        Promise.reject(error);
    }
)
service.interceptors.response.use(
    config => {
        console.log(config, 'response')
        if (config.data.code == 403) {
            router.push({ path: '/login' })
            return Promise.reject(config)
        }
    }, error => {
        Promise.reject(error);
    }
)
export default service