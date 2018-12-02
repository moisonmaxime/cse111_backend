let service = require('../services/authentication_service'),
    { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');

const loginSchema = Joi.object({
    body: Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required()
    })
}).unknown();

const registerSchema = Joi.object({
    body: Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(3).max(50).required(),
        name: Joi.string().min(3).max(50).required()
    })
}).unknown();


module.exports = function(app) {

    app.route('/auth/login')
        .post(validate(loginSchema), service.login);

    app.route('/auth/register')
        .post(validate(registerSchema), service.register);
};