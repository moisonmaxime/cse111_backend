let db = require('../db_manager');

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

exports.create_containers = function(req, res) {
    let username = req.params.username;
    let cname = req.params.cname;
    let ctype = req.params.ctype;
    let cid = req.params.cid;

    db.get(`INSERT INTO container
    (c_id, c_name, c_type)
    VALUES ($cid ,$cname, $ctype)`, { $username: username }, { $cid: cid}, { $cname: cname}, {$ctype: ctype}, function(err, result) {
            res.send(result);
    });

};

exports.update_containers = function(req, res) {
    let username = req.params.username;
    let cname = req.params.cname;
    let ctype = req.params.ctype;
    let cid = req. params.cid;

    db.get(`UPDATE container 
    SET c_name = $cname,
    c_type= $ctype
    FROM container, user, user_container
    WHERE  c_name = $cname`,{ $username: username }, { $cid: cid}, { $cname: cname}, {$ctype: ctype}, function(err, result) {
        res.send(result);
    });

};

exports.delete_containers = function(req, res) {
    let username = req.params.username;
    let cname = req.params.cname;

    db.get(`DELETE 
    FROM container, user_container, user 
    where uc_user_id = u_id 
    and uc_c_id = c_id 
    and u_username = $username
    and c_name = $cname`, { $username: username },  { $cname: cname}, function(err, result) {
        res.send(result);
    });
};