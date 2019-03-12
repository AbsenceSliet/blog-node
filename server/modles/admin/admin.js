'use strict';
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema({
    user_name: String,
    user_pwd: String,
    create_time: String,
    admin: {
        type: String,
        default: '普通会员'
    },
    admin_id: Number,
    status: Number, //1:普通会员 2:超级管理员
    avatar: {
        type: String,
        default: 'default.jpg'
    }
})
adminSchema.index({ admin_id: 1 })
const Admin = mongoose.model('Admin', adminSchema);
export default Admin