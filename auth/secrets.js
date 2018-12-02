const fs = require('fs');

const secretKey = process.env.SECRET || fs.readFileSync('./auth/secret_key.pem');
const databaseURL = process.env.DATABASE_URL || require('./database.secrets') || "";

exports.secretKey = secretKey;
exports.databaseURL = databaseURL;