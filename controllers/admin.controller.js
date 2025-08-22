const adminService=require('../services/admin.service')
const logger=require('../logger/logger')

class AdminController{
    async banUser(req,res){
        try {
            const { user_id, email, phone, reason } = req.body;
            if (!user_id || !email) {
                return res.status(400).json({ message: "userId and email are required", success: false });
            }

            const bannedUser = await adminService.banUser({ user_id, email, phone, reason });
            res.status(201).json({ 
                message: "User banned successfully", 
                data: bannedUser 
            });
        } catch (error) {
            logger.error('Error banning user', { error: error.message });
            res.status(500).json({ message: error.message, success: false });
        }
    }
    async getBannedUsers(req,res){
        try{
        logger.info('Getting all the banned users')
        const bannedUsers=await adminService.getBannedUsers();
        logger.info("Generated all admin users successfully",{
            data:bannedUsers.rows
        })
        res.json(bannedUsers.rows);
    }catch(error){
        logger.error("Failed to get the banned users",{
            error:error.message,
            stack:error.stack
        })
        res.status(500).json({message:"Error fetching the banned users",success:false})
     }
    }
    async getBannedUserById(req,res){
        try{
            const userId=req.params.id;
            logger.info("Getting banned user by user id")
            const userDetails=await adminService.getBannedUserById(userId);
             logger.info('Succesfully fetched the banned user id')
        res.json(userDetails.rows[0]);
        }catch(error){
            logger.error('Error getting the banned user details',{
                  error:error.message,
                stack:error.stack,
                input:req.body
            })
             res.status(500).json({message:"Error fetching the banned user details",success:false})
        }
    }

}

module.exports=new AdminController();