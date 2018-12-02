const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    fs = require('fs');

const secretKey = process.env.SECRET || fs.readFileSync('./key.pem');
const jwtExpirationTime = 86400*365; // 365 days in seconds

exports.databaseURL = process.env.DATABASE_URL || "postgres://hulxdpyzfkowpi:0330c72eab9e57090e7afdb934c4ffec01934ad41d3f837bdad82c6b6c57de3b@ec2-54-204-40-248.compute-1.amazonaws.com:5432/duh4gc86mstpp";

function hashPassword(password) {
    return bcrypt.hash(password, 8);
};
exports.hashPassword = hashPassword;

function checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
}
exports.checkPassword = checkPassword;

function signJWT(username) {
    return jwt.sign({ username: username }, secretKey, {
        expiresIn: jwtExpirationTime
    });
};
exports.signJWT = signJWT;

function verifyJWT(token) {
    return jwt.verify(token, secretKey).username
};
exports.verifyJWT = verifyJWT;
