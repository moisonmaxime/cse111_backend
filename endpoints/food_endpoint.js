module.exports = function(app) {
    var service = require('../services/food_service');

    app.route('/food/:username/:cname')
        .get(service.get_food)

    app.route('/food/:username/:cname')
        .post(service.create_food)

    app.route('/food/:username/:cname')
        .delete(service.delete_food)

    app.route('/food/:username/:fname')
        .put(service.update_food)
};