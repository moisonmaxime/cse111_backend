let service = require('../services/authentication_service'),
    { loginSchema, registerSchema, validate } = require('../joi_validator');

module.exports = function(app) {

    app.route('/auth/login')
        .post(validate(loginSchema), service.login);

    app.route('/auth/register')
        .post(validate(registerSchema), service.register);
};