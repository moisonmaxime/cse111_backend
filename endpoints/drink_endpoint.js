let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/drink_service');

let { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');


const createDrink = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
        dname: Joi.string().min(3).max(50).required(),
        dbrand: Joi.string().min(3).max(50).required(),
        dexpiredate: Joi.date().required(),
        dcalories: Joi.number().min(1).max(50).required(),
        dquantity: Joi.number().min(1).max(50).required()
    })
}).unknown();

const getDrink = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
    })
}).unknown();


const updateDrink = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
        did: Joi.number().min(1).max(50).required(),
        dname: Joi.string().min(3).max(50).required(),
        dbrand: Joi.string().min(3).max(50).required(),
        dexpiredate: Joi.date().required(),
        dcalories: Joi.number().min(1).max(50).required(),
        dquantity: Joi.number().min(1).max(50).required()
    })
}).unknown();

const deleteDrink = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
        did: Joi.number().min(1).max(50).required()
    })
}).unknown();

module.exports = function(app) {

    app.route('/drink')
        .get(authenticate(),validate(getDrink), service.getDrink);

    app.route('/drink')
        .post(authenticate(),validate(createDrink), service.createDrink);

    app.route('/drink/:dname')
        .put(authenticate(),validate(updateDrink), service.updateDrink);

    app.route('/drink/:dname')
        .delete(authenticate(),validate(deleteDrink), service.deleteDrink);
};