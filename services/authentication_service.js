let db = require('../db_manager');

exports.login = function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let pass_hash = password;
    console.log(" --- ");
    db.get("Select u_api_key as key from user where u_username = $username and u_password = $password",
        { $username: username, $password: pass_hash },
        function (err, result) {
            if (result) {
                res.send("Authenticated");
            } else {
                res.send("Invalid credentials");
            }
        });
};

exports.register = function(req, res) {

};