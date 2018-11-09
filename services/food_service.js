let db = require('../db_manager');

exports.get_food = function(req, res) {
    let username = req.params.username;
    let cname = req.params.cname;
    db.all(`SELECT f_name 
    FROM container, user_container, user, food 
    where uc_user_id = u_id 
    and uc_c_id = c_id 
    and f_container_id = c_id
    and c_name = $cname
    and u_username = $username`, { $username: username }, { $cname: cname }, function(err, result) {
        res.send(result);
    });
};

exports.create_food = function(req, res) {
    let username = req.params.username;
    let fid = req.params.fid;
    let fname = req.params.fname;
    let fbrand = req.params.fbrand;
    let fexpiredate = req.params.fexpiredate;
    let fcalories = req.params.fcalories;
    let fquanitity = req.params.fquanitity;
    let fcontainerid = req.params.fquanitity;

    db.get(`INSERT INTO food 
    (f_id, f_name, f_brand, f_expiredate, f_calories, f_quantity, f_container_id) 
    VALUES ($fid, $fname, $fbrand, $fexpiredate, $fcalories, $fquantity, $fcontainerid)`,
        { $username: username }, { $fname: fname }, { $fid: fid }, { $fbrand: fbrand },
        { $fexpiredate: fexpiredate }, { $fcalories: fcalories },
        { $fquantity: fquanitity }, { $fcontainerid: fcontainerid },
        function(err, result) {
            res.send(result);
        });
};

exports.delete_food = function(req, res) {
    let username = req.params.username;
    let dname = req.params.dname;
    let cname = req.params.cname;
    db.get(`DELETE
    FROM container, user_container, user, food
    where uc_user_id = u_id
    and uc_c_id = c_id
    and c_id = f_container_id 
    and u_username = $username
    and c_name = $cname
    and f_name = $fname`, { $username: username }, { $cname: cname},{ $fname: fname }, function(err, result) {
        res.send(result);
    });
};

exports.update_food = function(req, res) {
    let username = req.params.username;
    let fname = req.params.fname;
    let fbrand = req.params.fbrand;
    let fexpiredate = req.params.fexpiredate;
    let fcalories = req.params.fcalories;
    let fquanitity = req.params.fquanitity;
    db.get(`UPDATE food 
    SET f_name = $fname, 
    f_brand = $fbrand, 
    f_expiredate = $fexpiredate, 
    f_calories = $fcalories, 
    f_quantity = $fquantity, 
    where d_name = $fname`,
        { $username: username }, { $fname: fname },{ $fbrand: fbrand },
        { $fexpiredate: fexpiredate }, { $fcalories: fcalories },
        { $fquantity: fquanitity }, function(err, result) {
            res.send(result);
        });
};