let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/containers_service');


let { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');


const createContainerSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        type: Joi.string().min(3).max(50).required()
    })
}).unknown();

const getContentsSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().integer().required()
    })
}).unknown();

const updateContainerSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().integer().required()
    }),
    body: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        type: Joi.string().min(3).max(50).required()
    })
}).unknown();


module.exports = function(app) {
    app.route('/containers')
        .get(authenticate(), service.listContainers);

    app.route('/containers/:id/add-user')
        .get(authenticate(), validate(getContentsSchema), service.getContents);

    app.route('/containers/:id')
        .get(authenticate(), validate(getContentsSchema), service.getContents);

    app.route('/containers')
        .post(authenticate(), validate(createContainerSchema), service.createContainers);

    app.route('/containers/:id')
        .put(authenticate(), validate(updateContainerSchema), service.updateContainers);

    app.route('/containers/:id')
        .delete(authenticate(), validate(getContentsSchema), service.deleteContainers);

};