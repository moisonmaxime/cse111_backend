module.exports = function(app) {
    var service = require('../services/index');

    app.route('/')
        .get(service.index);
};