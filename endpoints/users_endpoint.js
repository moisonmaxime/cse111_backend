let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/users_service');

module.exports = function(app) {
    app.route('/user-info')
        .get(authenticate(), service.getCurrentUser);
    app.route('/users')
        .get(authenticate(), service.getCurrentUser);
};