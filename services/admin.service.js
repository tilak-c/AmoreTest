const adminRepository=require('../repository/admin.repository')
const logger=require('../logger/logger')

class AdminService{
    async banUser(userData){
        try {
            logger.info(`Checking if user ${userData.userId} is already banned`);
            const existingBan = await adminRepository.isUserAlreadyBanned(userData.userId);
            if (existingBan.rows.length > 0) {
                logger.warn("User is already banned", { userId: userData.userId });
                throw new Error("User is already banned");
            }

            logger.info(`Banning user: ${userData.userId}`);
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

    async getBannedUserById(userId){
        try{
       const report=  await adminRepository.getBannedUserById(userId);
        if(!report.rows || report.rows.length==0){
                   logger.warn("Banned user not found ",{data:userId});            
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