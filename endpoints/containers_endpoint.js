module.exports = function(app) {
    var service = require('../services/containers_service');

    app.route('/containers/:username')
        .get(service.get_containers);
};