module.exports = function(app) {
    var service = require('../services/authentication_service');

    app.route('/auth/login')
        .get(service.login);

    app.route('/auth/register')
        .post(service.register);
};