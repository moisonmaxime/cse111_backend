// --- Joi Express Middleware ---
function validate(schema) {
    return function(req, res, next) {
        let error = schema.validate(req).error;
        if (error) return res.status(422).send('Invalid parameters');
        next();
    }
}
exports.validate = validate