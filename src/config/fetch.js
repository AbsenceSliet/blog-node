import {
    baseUrl
} from './env'
// import axios from 'axios'
// import {
//     checkToken,
//     isLogin
// }
// from '@/constants'
// import {
//     TOKEN_HEADER,
//     TOKEN
// }
// from '@/constants/auth'

// export class HttpquesterService {
//     constructor() {
//         this.headers = {
//             'Content-Type': 'application/json; charset=utf-8'
//         }
//         this.token = ''
//         this.buildRequestUrl = this.buildRequestUrl
//         this.checkRequestToken = this.checkRequestToken
//     }
//     checkRequestToken(url) {
//         if (isLogin(url)) {
//             this.headers = this.headers.delete(TOKEN_HEADER)
//             return
//         }
//         if (checkToken) {
//             this.token = localStorage.getItem(TOKEN)
//             this.headers = this.headers.set(TOKEN_HEADER, `Bearer ${this.token}`)
//         } else {
//             console.warn('Token 无效')
//         }
//     }
//     buildRequestUrl(url) {
//         return `${baseUrl}${url}`
//     }
//     get(url, getparams, Promise) {
//         let params = ''
//         if (getparams) {
//             Object.keys(getparams).map(k => {
//                 params = params.set(k, getparams[k])
//             })
//         }
//         this.checkRequestToken(url)
//         retrun Promise((resolve, reject) => {

//         })
//     }
// }
// const service = axios.create({
//     baseURL: baseUrl,
//     timeout: 15000,
//     headers: {
//         'Content-Type': 'application/json; charset=utf-8'
//     }
// })

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    console.log(data)
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            mode: "cors",
            cache: "force-cache"
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                // requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}