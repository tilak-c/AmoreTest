const { report } = require('../routes/report.route');
const reportService=require('../services/report.service')

class ReportController{
    async createReport(req,res){
        try{
            const reportData=req.body;
            const report=await reportService.createReport(reportData);
            res.status(201).json({message:'Report created',report});
        }
        catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }
    async getReports(req,res){
        try{
        const reports=await reportService.getReports();
        res.json(reports.rows);
        }catch(error){
            res.status(500).json({message:"Error fetching the reports",success:False})
        }
    }
    async getReportById(req,res){
        try{
        const reportId=req.params.id
        const report = await reportService.getReportById(reportId);
        if(!report.rows || report.rows.length){
            return res.status(404).json({
                message:'Report not found',
                success:false
            })
        }
        res.json(report.rows[0]);
        }
        catch(error){
             res.status(500).json({message:"Error fetching the report",success:False})
        }
    }
    async updateReportStatus(req,res){
        try{
            const reportId=req.params.id;
            const {status,moderator_notes}=req.body;
            if(!status){
                return res.json("Status is required")
            }
            const report=await reportService.updateReportStatus(reportId,status,moderator_notes);
            res.json({message:"updated report successfully",report});
        }catch(error){
            res.status(500).json({message:'500 Internal Error'})
        }
    }
    
}
module.exports = new ReportController();