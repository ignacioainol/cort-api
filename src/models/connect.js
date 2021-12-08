require('dotenv').config()

const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER_DATABASE,
    host: process.env.HOST_DATABASE,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DATABASE
});


const connecting = async () => {
    const client = await pool.connect();
    return client;
};

exports.connecting = connecting;