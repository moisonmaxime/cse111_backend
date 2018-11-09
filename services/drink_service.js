let db = require('../db_manager');

exports.get_drink = function(req, res) {
    let username = req.params.username;
    let cname = req.params.cname;
    db.all(`SELECT d_name 
    FROM container, user_container, user, drink 
    where uc_user_id = u_id 
    and uc_c_id = c_id 
    and d_container_id = c_id
    and c_name = $cname
    and u_username = $username`, { $username: username }, { $cname: cname }, function(err, result) {
        res.send(result);
    });
};

exports.create_drink = function(req, res) {
    let username = req.params.username;
    let did = req.params.did;
    let dname = req.params.dname;
    let dbrand = req.params.dbrand;
    let dexpiredate = req.params.dexpiredate;
    let dcalories = req.params.dcalories;
    let dquanitity = req.params.dquanitity;
    let dcontainerid = req.params.dquanitity;

    db.get(`INSERT INTO drink 
    (d_id, d_name, d_brand, d_expiredate, d_calories, d_quantity, d_container_id) 
    VALUES ($did, $dname, $dbrand, $dexpiredate, $dcalories, $dquantity, $dcontainerid)`,
        { $username: username }, { $dname: dname }, { $did: did }, { $dbrand: dbrand },
        { $dexpiredate: dexpiredate }, { $dcalories: dcalories },
        { $dquantity: dquanitity }, { $dcontainerid: dcontainerid },
        function(err, result) {
        res.send(result);
    });
};

exports.delete_drink = function(req, res) {
    let username = req.params.username;
    let dname = req.params.dname;
    let cname = req.params.cname;
    db.get(`DELETE
    FROM container, user_container, user, drink
    where uc_user_id = u_id
    and uc_c_id = c_id
    and c_id = d_container_id 
    and u_username = $username
    and c_name = $cname
    and d_name = $dname`, { $username: username }, { $cname: cname},{ $dname: dname }, function(err, result) {
        res.send(result);
    });
};

exports.update_drink = function(req, res) {
    let username = req.params.username;
    let dname = req.params.dname;
    let dexpiredate = req.params.dexpiredate;
    let dcalories = req.params.dcalories;
    let dquanitity = req.params.dquanitity;
    db.get(`UPDATE drink 
    SET d_name = $dname, 
    d_brand = $dbrand, 
    d_expiredate = $dexpiredate, 
    d_calories = $dcalories, 
    d_quantity = $dquantity, 
    where d_name = $dname`,
        { $username: username }, { $dname: dname }, { $did: did }, { $dbrand: dbrand },
        { $dexpiredate: dexpiredate }, { $dcalories: dcalories },
        { $dquantity: dquanitity }, function(err, result) {
        res.send(result);
    });
};
