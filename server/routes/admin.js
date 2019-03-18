'use strict';

import express from 'express';
import Admin from '../controller/admin/admin'
const router = express.Router()

router.post('/login', Admin.login)
router.get('/getuserinfo', Admin.getAdminInfo)

export default router