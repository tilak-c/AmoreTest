const express=require('express')
const adminController=require('../controllers/admin.controller');

const adminRouter=express.Router()

adminRouter.get('/api/admin/ban-user',
adminController.getBannedUsers.bind(adminController))

adminRouter.get('/api/admin/ban-user/:id',
adminController.getBannedUserById.bind(adminController))

adminRouter.post('/api/admin/ban-user',
adminController.banUser.bind(adminController))

module.exports=adminRouter;