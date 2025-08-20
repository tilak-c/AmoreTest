const express =require('express')
const router =require('./routes/report.route.js')
const app=express()
const logger=require('./logger/logger.js');

app.use(express.json())
app.use('/',router)

app.listen(3000,()=>{
    logger.info('Server is running')
})