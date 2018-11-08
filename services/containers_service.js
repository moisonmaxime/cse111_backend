let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('fridge.db');

exports.get_containers = function(req, res) {
    let username = req.params.username;
    db.all(`SELECT c_name 
    FROM container, user_container, user 
    where uc_user_id = u_id 
    and uc_c_id = c_id 
    and u_username = $username`, { $username: username }, function(err, result) {
        res.send(result);
    });
};