let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/food_service');

module.exports = function(app) {


    app.route('/food')
        .get(authenticate(), service.getFood);

    app.route('/food')
        .post(authenticate(), service.createFood);

    app.route('/food/:fname')
        .put(authenticate(), service.updateFood);

    app.route('/food/:fname')
        .delete(authenticate(), service.deleteFood);
};