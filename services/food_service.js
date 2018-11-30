let db = require('../db_manager')

async function createFood(req, res) {
    try {

        let uid = req.user.id;
        let cid = req.body.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_user_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");

        await db.run(
            'INSERT INTO food (f_name, f_brand, f_expiredate, f_calories, f_quantity) ' +
            'VALUES ($fname, $fbrand, $fexpiredate, $fcalories, $fquantity)',
            {
                $fname: req.body.fname,
                $fbrand: req.body.fbrand,
                $fexpiredate: req.body.fexpiredate,
                $fcalories: req.body.fcalories,
                $fquantity: req.body.fquantity,
            });

            res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.createFood = createFood;

async function getFood(req, res) {
    try {

        let uid = req.user.id;
        let cid = req.params.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_user_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");


        await db.all('SELECT f_name, Cast ((JulianDay(f_expiredate)-JulianDay(\'now\')) As Integer)as fo \n    ' +
            'FROM container, user_container, user, food \n   ' +
            'where uc_user_id = u_id' +
            'and uc_c_id = c_id' +
            'and f_container_id = c_id' +
            'and c_id = $cid' +
            'and u_id = $uid' +
            'order by fo asc'
            ,{
                $uid: req.user.uid,
                $cid: req.params.id
        });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.getFood = getFood;


async function updateFood(req, res) {
    try {

        let uid = req.user.id;
        let cid = req.body.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_user_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");


        await db.run('UPDATE food\n    ' +
            'SET f_name = $fname, \n    ' +
            'f_brand = $fbrand, \n    ' +
            'f_expiredate = $fexpiredate, \n    ' +
            'f_calories = $fcalories, \n    ' +
            'f_quantity = $fquantity, \n    ' +
            'where f_id = $fid'
            ,{
                $fid: req.body.fid,
                $fname:req.body.fname,
                $fbrand: req.body.fbrand ,
                $fexpiredate: req.body.fexpiredate ,
                $fcalories:req.body.fcalories ,
                $fquantity: req.body.fquantity
            });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.updateFood = updateFood;


async function deleteFood(req, res) {
    try {

        let uid = req.user.id;
        let cid = req.params.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_user_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");


        await db.run('DELETE\n    ' +
            'FROM container, user_container, user, food\n   ' +
            ' where uc_user_id = u_id\n    ' +
            'and uc_c_id = c_id\n    ' +
            'and c_id = f_container_id \n    ' +
            'and c_id = $cid\n    ' +
            'and f_id = $fid'
            ,{$cid: req.params.cid, $fid: req.params.fid});

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.deleteFood = deleteFood;