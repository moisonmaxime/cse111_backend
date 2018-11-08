module.exports = function(app) {
    var service = require('../services/users_service');

    app.route('/users')
        .get(service.get_all_users);

    app.route('/users/:username')
        .get(service.get_user);
};