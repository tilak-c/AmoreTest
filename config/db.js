const { pool } =require('pg');
const config=require('./config')
const logger=require('../logger/logger')

const con = new pool(config);

con.connect()
    .then(() => logger.info("Database Connected"))
    .catch(err => logger.error("Connection Error", err));
module.exports={con};