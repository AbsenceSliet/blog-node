import AdminModel from '../../modles/admin/admin'
import BaseComponent from '../../mixins/baseComponent'
import {
    Base64
} from 'js-base64'
import { AUTH } from '../../app.config'
import Crypto from 'crypto'
import jwt from 'jsonwebtoken'
import time from 'time-formater'
import moment from 'moment'
import {
    handleSuccess,
    handleError
}
from '../../utils/helper'

class Admin extends BaseComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
        this.decodePassword = this.decodePassword.bind(this)
        this.md5Decode = this.md5Decode.bind(this)
    }
    async login(req, res, next) {

        const { username, password, status = 1 } = req.body
        if (!username) {
            throw new Error('用户名参数错误')
        } else if (!password) {
            throw new Error('密码参数错误')
        }

        const newpassword = this.md5Decode(this.decodePassword(password))

        const admin = await AdminModel.findOne({ username })
            // admin.password = admin.password || this.md5Decode(AUTH.defaultPassword)
        if (!admin) {

            const adminTip = status == 1 ? `普通会员` : `超级管理员`
            const admin_id = await this.getId('admin_id')
            const adminContent = {
                username: username,
                password: newpassword,
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                admin: adminTip,
                status,
                admin_id: admin_id
            }
            await AdminModel.create(adminContent)
            handleSuccess({ res, message: '注册管理员成功' })
        } else if (newpassword != admin.password) {
            handleError({
                res,
                message: '用户名已经存在，密码错误'
            })
        } else {
            console.log(admin);
            const token = jwt.sign({
                data: AUTH.data,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
            }, AUTH.jwtToken)
            console.log(token, 'token');
            handleSuccess({
                res,
                result: {
                    token,
                    userstatus: admin.status
                },
                message: '登陆成功'
            })
        }
    }

    // 密码编码
    decodePassword(pwd) {
        return pwd ? Base64.decode(pwd) : pwd
    }

    // md5编码
    md5Decode(password) {
        return Crypto.createHash('md5').update(password).digest('jac')
    }
    async getAdminInfo(req, res, next) {
        let info = await AdminModel.find({}, '-_id username status');
        console.log(info)
    }
}
export default new Admin()