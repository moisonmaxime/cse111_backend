let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/containers_service');


let { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');


const getContainer = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
        id: Joi.number().min(1).max(50).required()
    })
}).unknown();


const getContents = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),

    })
}).unknown();


const createContainer = Joi.object({
    body: Joi.object({
        cname: Joi.string().min(3).max(50).required(),
        ctype: Joi.string().min(3).max(50).required()
    })
}).unknown();


const updateContainer = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required(),
        cname: Joi.string().min(3).max(50).required(),
        cnewname: Joi.string().min(3).max(50).required(),
        ctype: Joi.string().min(3).max(50).required()
    })
}).unknown();


const deleteContainer = Joi.object({
    body: Joi.object({
        cid: Joi.number().min(1).max(50).required()

    })
}).unknown();

module.exports = function(app) {
    app.route('/containers')
        .get(authenticate(), service.getContainer);

    app.route('/containers/:cname')
        .get(authenticate(), service.getContents);

    app.route('/containers')
        .post(authenticate(),validate(createContainer), service.createContainers);

    app.route('/containers')
        .put(authenticate(),validate(updateContainer), service.updateContainers);

    app.route('/containers')
        .delete(authenticate(),/*validate(deleteContainer),*/ service.deleteContainers);

};