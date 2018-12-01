let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/containers_service');


let { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');


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
        ctype: Joi.string().min(3).max(50).required()
    })
}).unknown();


module.exports = function(app) {
    app.route('/containers')
        .get(authenticate(), service.getContainer);

    app.route('/containers/:cid')
        .get(authenticate(), service.getContents);

    app.route('/containers')
        .post(authenticate(),validate(createContainer), service.createContainers);

    app.route('/containers/:cid')
        .put(authenticate(),validate(updateContainer), service.updateContainers);

    app.route('/containers/:cid')
        .delete(authenticate(), service.deleteContainers);

};