const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    { secretKey } = require('./secrets');

const jwtExpirationTime = 86400*365; // 365 days in seconds

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
