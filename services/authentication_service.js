let db = require('../db_manager'),
    bcrypt = require('bcrypt'),
    { validate } = require('express-validator/check');

exports.login = function(req, res) {

    const errors = validate(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let username = req.query.username;
    let password = req.query.password;

    db.get("Select u_api_key as key, u_password as hash from user where u_username = $username",
        { $username: username},
        function (err, result) {
            if (err) {
                return res.sendStatus(500);
            }

            if (result) {
                return bcrypt.compare(password, result.hash, function (error, match) {
                    if (error) { return res.status(500).send(); }
                    if (match) { return res.json({ api_key: result.key }); }
                    else { return res.status(400).send("Invalid credentials"); }
                });
            }

            return res.status(400).send("Invalid credentials");
        });
};

exports.register = function(req, res) {

};