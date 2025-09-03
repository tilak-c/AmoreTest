const express =require('express')
const reportRouter =require('./routes/report.route.js')
const app=express()
const logger=require('./logger/logger.js');
const adminRouter=require('./routes/admin.route.js')
app.use(express.json())
app.use('/',reportRouter)
app.use('/',adminRouter)
app.listen(3000,()=>{
    logger.info('Server is running')
})