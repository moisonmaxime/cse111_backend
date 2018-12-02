let service = require('../services/audience');

module.exports = function(app) {

    app.route('/audience/:tname')
        .get(service.getAudience);


};