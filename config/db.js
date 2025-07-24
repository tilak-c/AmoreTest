const { Client} =require('pg');
const config=require('./dbConfig.json')


const con = new Client(config);

con.connect()
    .then(() => console.log("Database Connected"))
    .catch(err => console.error("Connection Error", err));
module.exports={con};