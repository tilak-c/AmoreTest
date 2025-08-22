const adminRepository=require('../repository/admin.repository')
const logger=require('../logger/logger')

class AdminService{
    async banUser(userData){
        try {
            logger.info(`Checking if user ${userData.user_id} is already banned`);
            const existingBan = await adminRepository.isUserAlreadyBanned(userData.user_id);
            if (existingBan.rows.length > 0) {
                logger.warn("User is already banned", { userId: userData.user_id });
                throw new Error("User is already banned");
            }

            logger.info(`Banning user: ${userData.user_id}`);
            const bannedUser = await adminRepository.banUser(userData);
            return bannedUser;
        } catch (error) {
            logger.error("Failed to ban user", { error: error.message });
            throw error;
        }
    }
    async getBannedUsers(){
        try{
            logger.info('Fetching all banned users from database');
        const userDetails= await adminRepository.getBannedUsers();
        logger.info("Successfully fetched the banned users",{
            data:userDetails
        })
        return userDetails;
        }catch(error){
            logger.error("Failed to fetch banned users from from DB",{
                error:error.message,
                stack:error.stack,
            })
            throw new Error('Failed to get banned users ,Please try again')
        }
    }

    async getBannedUserById(user_id){
        try{
       const report=  await adminRepository.getBannedUserById(user_id);
        if(!report.rows || report.rows.length==0){
                   logger.warn("Banned user not found ",{data:user_id});            
                   return null;
               }
       return report;
        }catch(error){
            logger.error('Failed to get banned user by id, please try again')
            throw new Error('Failed to get banned user, please try again')
        }
    }

}

module.exports=new AdminService();