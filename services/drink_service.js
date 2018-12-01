let db = require('../db_manager')

// async function getDrink(req, res) {
//     try {
//
//         let drink = await db.get('SELECT d_name, Cast ((JulianDay(d_expiredate)-JulianDay(\'now\')) As Integer)as daysToEat    ' +
//             'FROM container, user_container, user, drink   ' +
//             'where uc_user_id = u_id    ' +
//             'and uc_c_id = c_id   ' +
//             'and d_container_id = c_id ' +
//             'and c_id = $cid ' +
//             'and u_id = $uid ' +
//             'order by daysToEat asc '
//             ,{
//                 $uid: uid,
//                 $cid: cid
//             });
//
//
//         res.send(drink);
//
//     } catch (e) {
//         console.log(e);
//         return res.sendStatus(404);
//     }
// }
// exports.getDrink = getDrink;


async function createDrink(req, res) {
    try {

        let containerID= await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $id ' +
            'and uc_user_id = $user_id ',
            { $id: req.body.container_id, $user_id: req.user.id }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container");

        await db.run('INSERT INTO drink( d_name, d_brand, d_expiredate, d_calories, d_quantity, d_container_id) ' +
            'VALUES ($name, $brand, $expiration, $calories, $quantity, $container_id)'
            ,{
                $name: req.body.name,
                $brand: req.body.brand ,
                $expiration: req.body.expiration ,
                $calories: req.body.calories ,
                $quantity: req.body.quantity,
                $container_id: req.body.container_id
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

        let drinkID= await db.get(
            'select d_id ' +
            'from drink, user_container ' +
            'where uc_c_id = d_container_id ' +
            'and uc_user_id = $user_id ' +
            'and d_id = $id',
            { $id: req.params.id, $user_id: req.user.id });

        if (!drinkID) return res.status(400).send ("User doesn't own drink");

        await db.run('UPDATE drink' +
            'SET d_name = $name, ' +
            'd_brand = $brand, ' +
            'd_expiredate = $expiration,' +
            'd_calories = $calories,' +
            'd_quantity = $quantity,' +
            'where d_id = $id'
            ,{
                $name: req.body.name,
                $brand: req.body.brand ,
                $expiration: req.body.expiration ,
                $calories: req.body.calories ,
                $quantity: req.body.quantity,
                $id: req.params.id
            });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.updateDrink = updateDrink;


async function deleteDrink(req, res) {
    try {

        let drinkID= await db.get(
            'select d_id ' +
            'from drink, user_container ' +
            'where uc_c_id = d_container_id ' +
            'and uc_user_id = $user_id ' +
            'and d_id = $id',
            { $id: req.params.id, $user_id: req.user.id });

        if (!drinkID) return res.status(400).send ("User doesn't own drink");

        await db.run('DELETE ' +
            'FROM drink ' +
            'where d_id = $id'
            ,{$id: req.params.id});

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.deleteDrink = deleteDrink;