let db = require('../db_manager');

exports.get_all_users = function(req, res) {
    db.all("SELECT u_username as username FROM user", function(err, result) {
        res.send(result);
    });
};

exports.get_user = function(req, res) {
    let username = req.params.username;
    db.get("SELECT * FROM user where u_username = $username", { $username: username },function(err, result) {
        res.send(result);
    });
};