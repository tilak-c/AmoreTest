const { con } = require('../config/db');
const logger = require('../logger/logger');

class AdminRepository {
    async banUser(userData) {
        const { user_id, email, phone, reason } = userData;
        const query = `
            INSERT INTO "banned_users" (user_id, email, phone, reason)
            VALUES ($1, $2, $3, $4)
        `;
        try {
            const result = await con.query(query, [user_id, email, phone, reason]);
            return result;
        } catch (err) {
            logger.error(`Error banning user (ID: ${user_id}): ${err.message}`);
            throw err;
        }
    }

    async isUserAlreadyBanned(user_id) {
        const query = `
            SELECT * FROM "banned_users"
            WHERE user_id = $1 AND is_active = TRUE
        `;
        try {
            return await con.query(query, [user_id]);
        } catch (err) {
            logger.error(`Error checking ban status for user (ID: ${user_id}): ${err.message}`);
            throw err;
        }
    }

    async getBannedUsers() {
        const query = `SELECT * FROM "banned_users"`;
        try {
            return await con.query(query);
        } catch (err) {
            logger.error(`Error fetching banned users: ${err.message}`);
            throw err;
        }
    }

    async getBannedUserById(userId) {
        const query = `SELECT * FROM "banned_users" WHERE user_id = $1`;
        try {
            return await con.query(query, [userId]);
        } catch (err) {
            logger.error(`Error fetching banned user by ID (${userId}): ${err.message}`);
            throw err;
        }
    }
}

module.exports = new AdminRepository();