let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/tag_service');

module.exports = function(app) {

    app.route('/tag')
        .get(authenticate(), service.getTag);

    app.route('/tag/:tname')
        .get(authenticate(), service.getTagContents);

    app.route('/tag')
        .post(authenticate(), service.createTag);

};