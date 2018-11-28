let { authenticate } = require('../middleware/authenticator'),
    service = require('../services/drink_service');

module.exports = function(app) {

    app.route('/drink')
        .get(authenticate(), service.getDrink);

    app.route('/drink')
        .post(authenticate(), service.createDrink);

    app.route('/drink/:dname')
        .put(authenticate(), service.updateDrink);

    app.route('/drink/:dname')
        .delete(authenticate(), service.deleteDrink);
};