
require('dotenv').config();
const { Pool } = require('pg');

const useSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: useSSL ? { rejectUnauthorized: false } : false
});

module.exports = pool;