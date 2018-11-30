let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/tag_service');

let { validate } = require('../middleware/joi_validator'),
    Joi = require('joi');

const createTag = Joi.object({
    body: Joi.object({
        tname: Joi.string().min(3).max(50).required()
    })
}).unknown();

module.exports = function(app) {

    app.route('/tag')
        .get(authenticate(),  service.getTag);

    app.route('/tag/:tname')
        .get(authenticate(), service.getTagContents);

    app.route('/tag')
        .post(authenticate(),validate(createTag), service.createTag);

};