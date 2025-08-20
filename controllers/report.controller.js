const { report } = require('../routes/report.route');
const reportService=require('../services/report.service')
const logger=require('../logger/logger');

class ReportController{
    async createReport(req,res){
        try{
            const reportData=req.body;
            logger.info('Creating report',{
                data:reportData});
            const report=await reportService.createReport(reportData);
            logger.info('Report created successfully')
            res.status(201).json({message:'Report created',report});
        }
        catch(error){
            logger.error('Failed to create report',{
                error:error.message,
                stack:error.stack,
                input:req.body})
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }
    async getReports(req,res){
        try{
        logger.info("Getting all the reports")
        const reports=await reportService.getReports();
        logger.info("Generated all reports successfully",{
            data:reports.rows})
        res.json(reports.rows);
        }catch(error){
            logger.error("Failed to get the reports",{
                error:error.message,
                stack:error.stack
            })
            res.status(500).json({message:"Error fetching the reports",success:false})
        }
    }
    async getReportById(req,res){
        try{
        const reportId=req.params.id
        logger.info('Getting report by report ID')
        const report = await reportService.getReportById(reportId);
        logger.info('Succesfully fetched the report by reportID')
        res.json(report.rows[0]);
        }
        catch(error){
            logger.error('Error getting the report',{
                  error:error.message,
                stack:error.stack,
                input:req.body
            })
             res.status(500).json({message:"Error fetching the report",success:false})
        }
    }
    async updateReportStatus(req,res){
        try{
            logger.info("Updating the report status")
            const reportId=req.params.id;
            logger.info("Successfully fetched the report ID",{
                data:reportId})
            const {status,moderator_notes}=req.body;
            logger.info("Successfully fetched the status",{
                data:status})
                logger.info("Successfully fetched the moderator notes",{
                data:moderator_notes})
            const report=await reportService.updateReportStatus(reportId,status,moderator_notes);
            logger.info("Successfully updated the report")
            res.json({message:"Updated report successfully",report});
        }catch(error){
             logger.error('Failed to update the report status',{
                  error:error.message,
                stack:error.stack,
                input:{
                    reprtId:req.params.id,
                    body:req.body
                }
            })
            res.status(500).json({message:'500 Internal Error'})
        }
    }

}
module.exports = new ReportController();