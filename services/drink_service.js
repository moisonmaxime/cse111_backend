let db = require('../db_manager')

async function getDrink(req, res) {
    try {
        let drink = await db.get('SELECT d_name, Cast ((JulianDay(d_expiredate)-JulianDay(\'now\')) As Integer)as do \n    ' +
            'FROM container, user_container, user, drink \n    ' +
            'where uc_user_id = u_id \n    ' +
            'and uc_c_id = c_id \n    ' +
            'and d_container_id = c_id\n    ' +
            'and c_name = $cname\n    ' +
            'order by do asc'
            ,{ $id: req.user.id, $cname: req.params.cname });
        res.send(drink);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.getDrink = getDrink;

async function createDrink(req, res) {
    try {
        let drink = await db.run('INSERT INTO drink\n    ' +
            '(d_id, d_name, d_brand, d_expiredate, d_calories, d_quantity, d_container_id) \n    ' +
            'VALUES ($did, $dname, $dbrand, $dexpiredate, $dcalories, $dquantity, $dcontainerid)'
            ,{ $dname: req.body.dname, $dbrand: req.body.dbrand , $dexpiredate: req.body.dexpiredate ,  $dcalories: req.body.dcalories , $dquantity: req.body.dquanitity});
        res.send(drink);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.createDrink = createDrink;


async function updateDrink(req, res) {
    try {
        let drink = await db.run('UPDATE drink\n    ' +
            'SET d_name = $dname, \n    ' +
            'd_brand = $dbrand, \n    ' +
            'd_expiredate = $dexpiredate, \n    ' +
            'd_calories = $dcalories, \n    ' +
            'd_quantity = $dquantity, \n    ' +
            'where d_name = $dname'
            ,{ $dname: req.body.dname, $dbrand: req.body.dbrand , $dexpiredate: req.body.dexpiredate ,  $dcalories: req.body.dcalories , $dquantity: req.body.dquanitity});
        res.send(drink);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.updateDrink = updateDrink;


async function deleteDrink(req, res) {
    try {
        let drink = await db.run('DELETE\n    ' +
            'FROM container, user_container, user, drink\n    ' +
            'where uc_user_id = u_id\n    ' +
            'and uc_c_id = c_id\n    ' +
            'and c_id = d_container_id \n    ' +
            'and c_name = $cname\n    ' +
            'and d_name = $dname'
            ,{ $dname: req.body.dname, $cname: req.body.cname,});
        res.send(drink);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.deleteDrink = deleteDrink;