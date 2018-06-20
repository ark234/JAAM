// Import dependencies
const pgp = require('pg-promise')();
const dotenv = require('dotenv').config();

// Configuration object
const cn = {
	host: 'localhost',
	port: 5432,
	database: 'jaam_db'
};

const db = pgp(process.env.DATABASE_URL || cn);

module.exports = db;
