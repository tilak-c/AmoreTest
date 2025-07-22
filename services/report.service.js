const reportRepository=require('../repository/report.repository')

class ReportService{
    async createReport(reportData){
         const { reported_userid, reporter_userid, reason } = reportData;
        
        if (!reason) {
            throw new Error('Missing required field:reason');
        }
        const report={
            reported_userid,
            reporter_userid,
            reason,
            description: reportData.description || null,
            status: 'Under Review', // Default status
            moderator_notes: null
        }
        
       return await reportRepository.createReport(report);
    }
    async getReports(){
        return await reportRepository.getReports();
    }
    async getReportById(reportId){
        return await reportRepository.getReportById(reportId);
    }
    async updateReportStatus(reportId,status,moderatorNotes){
        return await reportRepository.updateReportStatus(reportId,status,moderatorNotes);
    }
    // async createReportWithDailyLimit(userId){
    //     const reportCount=await reportRepository.createReportWithDailyLimit(userId);
    //     if(reportCount>=4){
    //         return res.status(400).json({message:"Daily report limit reached"});
    //     }
    //     else{
    //     return await reportRepository.createReportWitshDailyLimit(userId)
    //     }
    // }
}
module.exports=new ReportService();