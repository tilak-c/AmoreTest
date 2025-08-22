const { con } = require('../config/db');
const logger = require('../logger/logger');

class ReportRepository {
    async createReport(reportData) {
        try {
            const { reported_userid, reporter_userid, reason, description, status, moderator_notes } = reportData;
            const query = `
                INSERT INTO "reports"
                (reported_userid, reporter_userid, reason, description, status, moderator_notes)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `;
            const result = await con.query(query, [reported_userid, reporter_userid, reason, description, status, moderator_notes]);
            return result.rows[0];
        } catch (error) {
            logger.error('Failed to create report in DB', {
                error: error.message,
                stack: error.stack,
                data: reportData
            });
            throw new Error('Database error while creating report');
        }
    }

    async getReports() {
        try {
            const query = `SELECT * FROM "reports"`;
            const result = await con.query(query);
            return result;
        } catch (error) {
            logger.error('Failed to fetch all reports from DB', {
                error: error.message,
                stack: error.stack
            });
            throw new Error('Database error while fetching reports');
        }
    }

    async getReportById(reportId) {
        try {
            const query = `SELECT * FROM "reports" WHERE "report_id" = $1`;
            const result = await con.query(query, [reportId]);
            return result;
        } catch (error) {
            logger.error('Failed to fetch report by ID from DB', {
                error: error.message,
                stack: error.stack,
                reportId
            });
            throw new Error('Database error while fetching report by ID');
        }
    }

    async updateReportStatus(reportId, status, moderatorNotes) {
        try {
            const query = `
                UPDATE "reports"
                SET status = $2, moderator_notes = $3
                WHERE report_id = $1
                RETURNING *
            `;
            const result = await con.query(query, [reportId, status, moderatorNotes]);
            return result.rows[0];
        } catch (error) {
            logger.error('Failed to update report status in DB', {
                error: error.message,
                stack: error.stack,
                reportId,
                status,
                moderatorNotes
            });
            throw new Error('Database error while updating report status');
        }
    }
}

module.exports = new ReportRepository();