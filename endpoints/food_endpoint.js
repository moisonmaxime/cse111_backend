let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/food_service');

let { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');


const createFood = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
        fname: Joi.string().min(3).max(50).required(),
        fbrand: Joi.string().min(3).max(50).required(),
        fexpiredate: Joi.date().required(),
        fcalories: Joi.number().min(1).max(50).required(),
        fquantity: Joi.number().min(1).max(50).required()
    })
}).unknown();

const updateFood = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
        fid: Joi.number().min(1).max(50).required(),
        fname: Joi.string().min(3).max(50).required(),
        fbrand: Joi.string().min(3).max(50).required(),
        fexpiredate: Joi.date().required(),
        fcalories: Joi.number().min(1).max(50).required(),
        fquantity: Joi.number().min(1).max(50).required()
    })
}).unknown();

module.exports = function(app) {


    app.route('/food/:cid')
        .get(authenticate(), service.getFood);

    app.route('/food')
        .post(authenticate(),validate(createFood), service.createFood);

    app.route('/food/:cid/:fid')
        .put(authenticate(), validate(updateFood), service.updateFood);

    app.route('/food/:cid/:fid')
        .delete(authenticate(), service.deleteFood);
};