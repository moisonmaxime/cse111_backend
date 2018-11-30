let db = require('../db_manager')

async function getDrink(req, res) {
    try {

        let uid = req.user.id;
        let cid = req.params.cid;


        let drink = await db.all('SELECT d_name, Cast ((JulianDay(d_expiredate)-JulianDay(\'now\')) As Integer)as do    ' +
            'FROM container, user_container, user, drink   ' +
            'where uc_user_id = u_id    ' +
            'and uc_c_id = c_id   ' +
            'and d_container_id = c_id ' +
            'and c_id = $cid ' +
            'and u_id = $uid ' +
            'order by do asc '
            ,{
                $uid: uid,
                $cid: cid
            });


        res.send(drink);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.getDrink = getDrink;


async function createDrink(req, res) {
    try {
        let uid = req.user.id;
        let cid = req.body.cid;

        let containerID= await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $cid ' +
            'and uc_user_id = $uid '
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");

        await db.run('INSERT INTO drink( d_name, d_brand, d_expiredate, d_calories, d_quantity, d_container_id) ' +
            'VALUES ($dname, $dbrand, $dexpiredate, $dcalories, $dquantity, $dcontainerid)'
            ,{
                $dname: req.body.dname,
                $dbrand: req.body.dbrand ,
                $dexpiredate: req.body.dexpiredate ,
                $dcalories: req.body.dcalories ,
                $dquantity: req.body.dquantity,
                $dcontainerid: cid
            });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.createDrink = createDrink;


async function updateDrink(req, res) {
    try {

        let uid = req.user.id;
        let cid = req.body.cid;

        let containerID= await db.get(
            'select uc_c_id ' +
            'from user_container' +
            'where uc_c_id = $cid' +
            'and uc_user_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");

        await db.run('UPDATE drink' +
            'SET d_name = $dname, ' +
            'd_brand = $dbrand, ' +
            'd_expiredate = $dexpiredate,' +
            'd_calories = $dcalories,' +
            'd_quantity = $dquantity,' +
            'where d_id = $did'
            ,{
                $did: req.body.did,
                $dname: req.body.dname,
                $dbrand: req.body.dbrand ,
                $dexpiredate: req.body.dexpiredate ,
                $dcalories: req.body.dcalories ,
                $dquantity: req.body.dquantity
            });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.updateDrink = updateDrink;


async function deleteDrink(req, res) {
    try {

        let uid = req.user.id;
        let cid = req.params.cid;

        let containerID= await db.get(
            'select uc_c_id ' +
            'from user_container' +
            'where uc_c_id = $cid' +
            'and uc_user_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");

        await db.run('DELETE\n    ' +
            'FROM container, user_container, user, drink\n    ' +
            'where uc_user_id = u_id\n    ' +
            'and uc_c_id = c_id\n    ' +
            'and c_id = d_container_id \n    ' +
            'and c_id = $cid\n    ' +
            'and d_id = $did'
            ,{$cid: cid, $did: req.params.did});

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.deleteDrink = deleteDrink;