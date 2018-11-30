let service = require('../services/audience_service');

module.exports = function(app) {

    app.route('/audience/:tname')
        .get(service.getAudience);


};