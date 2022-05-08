const mysql = require('mysql');

const conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"softwareProj"
})

conn.connect(err => {
  if(!err){
    console.log('Database successfully connected , Thank you Jesus!!!');
  }else{
    console.log('Database failed to connected, Thank Him anyhow!!',JSON.stringify(err,undefined,2));
  }
})

module.exports = conn;