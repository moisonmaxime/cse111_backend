let db = require('../db_manager');
let bcrypt = require('bcrypt');

exports.login = function(req, res) {
    let username = req.query.username;
    let password = req.query.password;

    db.get("Select u_api_key as key, u_password as hash from user where u_username = $username",
        { $username: username},
        function (err, result) {
            if (err) {
                return res.status(500).send();
            }

            if (result) {
                return bcrypt.compare(password, result.hash, function (error, match) {
                    if (error) { return res.status(500).send(); }
                    if (match) { return res.send({ api_key: result.key }); }
                    else { return res.status(400).send("Invalid credentials"); }
                });
            }

            return res.status(400).send("Invalid credentials");
        });
};

exports.register = function(req, res) {

};