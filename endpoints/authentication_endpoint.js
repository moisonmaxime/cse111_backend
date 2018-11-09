module.exports = function(app) {
    let service = require('../services/authentication_service'),
        { check } = require('express-validator/check');


    app.route('/auth/login')
        .get([
            check('username').isLength({ min: 3, max: 32 }).isAlphanumeric().escape(),
            check('password').isLength({ min: 5, max: 32 }).isString().escape()
        ], service.login);

    app.route('/auth/register')
        .post(service.register);
};