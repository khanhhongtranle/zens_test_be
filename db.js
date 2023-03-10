require('dotenv').config();
const mysql = require('mysql');
var databaseConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
module.exports = databaseConnection;