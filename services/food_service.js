let db = require('../db_manager')

async function getFood(req, res) {
    try {
        let food = await db.get('SELECT f_name, Cast ((JulianDay(f_expiredate)-JulianDay(\'now\')) As Integer)as fo \n    ' +
            'FROM container, user_container, user, food \n   ' +
            'where uc_user_id = u_id' +
            'and uc_c_id = c_id' +
            'and f_container_id = c_id' +
            'and c_name = $cname' +
            'and u_id = $id' +
            'group by fo '
            ,{ $id: req.user.id, $cname: req.params.cname });
        res.send(food);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.getFood = getFood;

async function createFood(req, res) {
    try {
        let food = await db.run('INSERT INTO' +
            'food (f_name, f_brand, f_expiredate, f_calories, f_quantity, f_container_id ' +
            'VALUES ($fname, $fbrand, $fexpiredate, $fcalories, $fquantity, $fcontainerid)'
            ,{ $id: req.user.id, $fname:req.body.fname, $fbrand: req.body.fbrand , $fexpiredate: req.body.fexpiredate ,
                $fcalories:req.body.fcalories , $fquantity: req.body.fquanitity , $fcontainerid: req.body.fcontainerid });
        res.send(food);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.createFood = createFood;

async function updateFood(req, res) {
    try {
        let food = await db.run('UPDATE food\n    ' +
            'SET f_name = $fname, \n    ' +
            'f_brand = $fbrand, \n    ' +
            'f_expiredate = $fexpiredate, \n    ' +
            'f_calories = $fcalories, \n    ' +
            'f_quantity = $fquantity, \n    ' +
            'where f_name = $fname'
            ,{$fname:req.body.fname, $fbrand: req.body.fbrand , $fexpiredate: req.body.fexpiredate ,
                $fcalories:req.body.fcalories , $fquantity: req.body.fquanitity});
        res.send(food);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.updateFood = updateFood;

async function deleteFood(req, res) {
    try {
        let food = await db.run('DELETE\n    ' +
            'FROM container, user_container, user, food\n   ' +
            ' where uc_user_id = u_id\n    ' +
            'and uc_c_id = c_id\n    ' +
            'and c_id = f_container_id \n    ' +
            'and c_name = $cname\n    ' +
            'and f_name = $fname'
            ,{$cname: req.params.cname, $fname: req.params.fname});
        res.send(food);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.deleteFood = deleteFood;