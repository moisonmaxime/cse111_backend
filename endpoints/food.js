let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/food_service');

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


    // app.route('/food/:id')
    //     .get(authenticate(), validate(getSchema), service.getFood);

    app.route('/food')
        .post(authenticate(),validate(createSchema), service.createFood);

    app.route('/food/:id')
        .put(authenticate(), validate(updateSchema), service.updateFood);

    app.route('/food/:id')
        .delete(authenticate(), validate(getSchema), service.deleteFood);
};