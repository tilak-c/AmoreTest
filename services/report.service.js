const reportRepository=require('../repository/report.repository')
const logger=require('../logger/logger');
class ReportService{
    async createReport(reportData){
        const { reported_userid, reporter_userid, reason,description } = reportData;
        const validReasons = [
                'Inappropriate Messages',
                'Fake Profile',
                'Harassment',
                'Spam',
                'Inappropriate Photos',
                'Scam/Fraud',
                'Underage',
                'Other'
            ];
            logger.info("Starting report creation");
            if (!reason) {
                logger.warn("Missing field required ",reason)
                throw new Error('Missing required field:reason');
            }
            if (!validReasons.includes(reason)) {
                logger.warn(`Invalid reason. Valid reasons are: ${validReasons.join(', ')}`)
                throw new Error(`Invalid reason. Valid reasons are: ${validReasons.join(', ')}`);
            }
            if (description && description.length > 1000) {
                logger.warn('Description too long',{data:description.length})
                throw new Error('Description cannot exceed 1000 characters');
            }
       
        const report={
            reported_userid,
            reporter_userid,
            reason,
            description: reportData.description || null,
            status: 'Under Review', // Default status
            moderator_notes: null
        }
        logger.info("Creating report in DB");
       const result= await reportRepository.createReport(report);
       //unmatch automatically
       logger.info('Report successfully created',{
        data:result});
       return result;
    }
    async getReports(){
        try{
            logger.info('Fetching all reports from database');
        const report= await reportRepository.getReports();
        logger.info("Successfully fetched the reports",{
            data:report
        })
        return report;
        }catch(error){
            logger.error("Failed to fetch reports from DB",{
                error:error.message,
                stack:error.stack,
            })
            throw new Error('Failed to get reports ,Please try again')
        }
    }
    async getReportById(reportId){
        try{
       const report=  await reportRepository.getReportById(reportId);
        if(!report.rows || report.rows.length==0){
                   logger.warn("Report not found ",{data:reportId});            
                   return null;
               }
       return report;
        }catch(error){
             logger.error('Failed to get report by id, please try again', {
            error: error.message,
            stack: error.stack,
            reportId
        });
            throw new Error('Failed to get report by id, please try again')
        }
    }

    async updateReportStatus(reportId,status,moderatorNotes=null){
        try{
            logger.info("Updating the report status to database")
            if(!reportId){
                logger.warn("Report id is required")
                throw new Error("Report id is required")
            }
        if(!status){
            logger.warn("Missing required field:status");
            throw new Error('Missing required field:status');
        }
        const validStatuses=['Under Review', 'Action Taken', 'No Action Needed', 'Resolved', 'Cancelled'];
            if(!validStatuses.includes(status)){
                logger.warn(`Invalid status,valid statuses are ${validStatuses.join(',')}`)
                throw new Error(`Invalid status,valid statuses are ${validStatuses.join(',')}`)
            }
        if(moderatorNotes && moderatorNotes.length>1000){
            logger.warn("Moderator notes cannot exceed 1000 characters");
            throw new Error("Moderator notes cannot exceed 1000 characters")
        }
        const updatedReport=await reportRepository.updateReportStatus(reportId,status,moderatorNotes);
        if(!updatedReport){
            logger.warn('Failed to update report status,Please try again')
            throw new Error('Failed to update report status,Please try again')
        }
            return updatedReport;
     }catch(error){
        logger.error('Unable to update report status. Please try again later');
            throw new Error('Unable to update report status. Please try again later');
        
     }
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