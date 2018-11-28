let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/containers_service');

module.exports = function(app) {
    app.route('/containers')
        .get(authenticate(), service.getContainers);

    app.route('/containers')
        .get(authenticate(), service.getContents);

    app.route('/containers')
        .post(authenticate(), service.createContainers);

    app.route('/containers')
        .put(authenticate(), service.updateContainers);

    app.route('/containers')
        .delete(authenticate(), service.deleteContainers);

};