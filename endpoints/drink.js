let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/drink');

let { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');


const createSchema = Joi.object({
    body: Joi.object({
        container_id: Joi.number().integer().required(),
        name: Joi.string().min(3).max(50).required(),
        brand: Joi.string().min(3).max(50).optional(),
        expiration: Joi.date().optional(),
        calories: Joi.number().integer().optional(),
        quantity: Joi.number().integer().optional()
    })
}).unknown();


const getSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().integer().required()
    })
}).unknown();

const updateSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().integer().required()
    }),
    body: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        brand: Joi.string().min(3).max(50).optional(),
        expiration: Joi.date().optional(),
        calories: Joi.number().integer().optional(),
        quantity: Joi.number().integer().optional()
    })
}).unknown();



module.exports = function(app) {

    // app.route('/drink/:id')
    //     .get(authenticate(), validate(getSchema), service.getDrink);

    app.route('/drink')
        .post(authenticate(), validate(createSchema), service.createDrink);

    app.route('/drink/:id')
        .put(authenticate(), validate(updateSchema), service.updateDrink);

    app.route('/drink/:id')
        .delete(authenticate(), validate(getSchema), service.deleteDrink);
};