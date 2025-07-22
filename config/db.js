const { Client} =require('pg');

const con = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'tilak',
    database: "AmoreTest"
});

con.connect()
    .then(() => console.log("Database Connected"))
    .catch(err => console.error("Connection Error", err));
module.exports={con};