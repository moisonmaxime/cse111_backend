const { Pool } = require('pg');
const { databaseURL } = require('../auth/secrets');

const pool = new Pool({
    connectionString: databaseURL,
    ssl: true
});

const client = pool.connect();
exports.client = client;