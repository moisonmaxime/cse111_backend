module.exports = function(app) {
    var service = require('../services/index_service');

    app.route('/')
        .get(service.index);
};