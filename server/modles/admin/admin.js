'use strict';

import mongoose from 'mongoose'
import { AUTH } from '../../app.config'
import Crypto from 'crypto'
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: Crypto.createHash('md5').update(AUTH.defaultPassword).digest('jac')
    },
    create_time: {
        type: String,
        default: ''
    },
    admin: {
        type: String,
        default: '普通会员'
    },
    slogan: {
        type: String,
        default: ''
    },
    admin_id: {
        type: Number,
        default: ''
    },
    status: {
        type: Number,
        default: ''
    }, //1:普通会员 2:超级管理员
    avatar: {
        type: String,
        default: 'default.jpg'
    }
})
adminSchema.index({ admin_id: 1 })
const Admin = mongoose.model('Admin', adminSchema);
export default Admin