const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pass: '',
    database:'node-project'
})

con.query("SELECT * FROM users",(error,res)=>{
    console.log(res);
})