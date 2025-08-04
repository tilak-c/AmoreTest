const express =require('express')
const reportController= require('../controllers/report.controller');
const { updateReportStatus } = require('../repository/report.repository');
const reportRouter = express.Router();

reportRouter.get('/api/admin/reports',reportController.getReports.bind(reportController))

reportRouter.post('/postReport',reportController.createReport.bind(reportController));

reportRouter.get('/api/admin/reports/:id',reportController.getReportById.bind(reportController))

reportRouter.put('/api/admin/reports/:id',reportController.updateReportStatus.bind(reportController));


module.exports=reportRouter;