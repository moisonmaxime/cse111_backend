let Joi = require('joi');

// --- Auth schemas ---
const loginSchema = Joi.object({
    body: Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required()
    })
}).unknown();
exports.loginSchema = loginSchema;

const registerSchema = Joi.object({
    body: Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(3).max(50).required(),
        name: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required()
    })
}).unknown();
exports.registerSchema = registerSchema;


// --- Joi Express Middleware ---
function validate(schema) {
    return function(req, res, next) {
        let error = schema.validate(req).error;
        if (error) return res.status(422).send('Invalid parameters');
        next();
    }
}
exports.validate = validate