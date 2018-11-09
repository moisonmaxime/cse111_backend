module.exports = function(app) {
    var service = require('../services/containers_service');

    app.route('/containers/:username')
        .get(service.get_containers)

    app.route('/containers/:username/:cname')
        .post(service.create_containers)

    app.route('/containers/:username/:cname')
        .delete(service.delete_containers)

    app.route('/containers/:username/:cname/:ctype/:cid')
        .put(service.update_containers)
};
