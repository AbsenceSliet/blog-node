import AdminModel from '../../modles/admin/admin'
import BaseComponent from '../../mixins/baseComponent'
import config from '../../app.config'
import Crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dtime from 'time-formater'

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
            // throw new Error('用户名参数错误')
        } else if (!password) {
            // throw new Error('密码参数错误')
        }
        const newpassword = this.md5Decode(password)


        const admin = await AdminModel.findOne({ username })
        if (!admin) {
            const adminTip = status == 1 ? `普通会员` : `超级管理员`
            const admin_id = await this.getId('admin_id')
            const adminContent = {
                username: username,
                password: newpassword,
                create_time: dtime().format('YYYY-MM-DD HH:mm'),
                admin: adminTip,
                status,
                admin_id: admin_id
            }
            await AdminModel.create(adminContent)
            console.log(req.session)
                // req.session.admin_id = admin_id;
            res.send({
                status: 1,
                success: '注册管理员成功',
            })
        } else if (newpassword.toString() != admin.password.toString()) {
            res.send({
                status: 0,
                message: `用户名已经存在，密码错误`
            })
        } else {
            // req.session.admin_id = admin_id;
            res.send({
                status: 1,
                success: `登录成功`
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
}
export default new Admin()