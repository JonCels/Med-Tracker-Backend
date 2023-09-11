require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.connect(error => {
    if (error) throw error;
    console.log("Connected to the database");
});

module.exports = connection;