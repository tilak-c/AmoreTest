const {con} = require('../config/db')

class ReportRepository{
    async createReport(reportData){
        const { reported_userid ,reporter_userid ,reason,description,status,moderator_notes}=reportData;
        const postquery=`insert into "reports"
        (reported_userid ,reporter_userid ,reason,description,status,moderator_notes) values ($1,$2,$3,$4,$5,$6) returning *`
       const result= await con.query(postquery,[reported_userid ,reporter_userid ,reason,description,status,moderator_notes])
        return result.rows[0];
    }
    async getReports(){
        const query=`select * from "reports"`;
        const result=await con.query(query)
        return result;
    }
    async getReportById(reportId){
        const query=`select * from "reports" where "report_id" = $1`;
        const result= await con.query(query,[reportId]);
        return result;
    }
    async updateReportStatus(reportId,status,moderatorNotes){
        const query = `update "reports" set status=$2,moderator_notes=$3 where report_id = $1 returning *`
        const result=await con.query(query,[reportId,status,moderatorNotes]);
        return result.rows[0];
    }
    
}
module.exports=new ReportRepository();