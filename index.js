const express =require('express')
const router =require('./routes/report.route.js')
const app=express()
app.use(express.json())
app.use('/',router)

app.listen(3000,()=>{
    console.log('Server is running')
})