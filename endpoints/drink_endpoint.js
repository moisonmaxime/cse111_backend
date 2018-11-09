module.exports = function(app) {
    var service = require('../services/drink_service');

    app.route('/drink/:username/:cname')
        .get(service.get_drink)

    app.route('/drink/:username/:cname')
        .post(service.create_drink)

    app.route('/drink/:username/:cname')
        .delete(service.delete_drink)

    app.route('/drink/:username/:dname')
        .put(service.update_drink)
};
