const { Client } = require('pg');

const USER = process.env.USER || 'postgres';
const PASSWORD = process.env.PASSWORD || 'postgres';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5432;
const DATABASE = process.env.DATABASE || 'postgres';

const client = new Client({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: 5432,
});

module.exports = client;