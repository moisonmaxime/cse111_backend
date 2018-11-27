let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/users_service');

module.exports = function(app) {
    app.route('/user')
        .get(authenticate(), service.getCurrentUser);
};