const {con}=require('../config/db')

class AdminRepository{
    async banUser(userData){
        const {userId,email,phone,reason}=userData;
        const query=`insert into "banned_users" 
        (user_id,email,phone,reason) values ($1,$2,$3,$4)`
        const result=await con.query(query,[userId,email,phone,reason]);
        return result;
    }
    async isUserAlreadyBanned(userId) {
        const query = `
            select * FROM "banned_users" 
            where user_id = $1 AND is_active = TRUE
        `;
        return await con.query(query, [userId]);
    }

    async getBannedUsers(){
        const query=`select * from "banned_users"`;
        const result=await con.query(query);
        return result;
    }
    async getBannedUserById(userId){
        const query=`select * from banned_users where "user_id"=$1`
        const result=await con.query(query,[userId]);
        return result;
    }
}

module.exports=new AdminRepository();