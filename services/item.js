let db = require('../database/db_manager')

// async function getFood(req, res) {
//     try {
//
//         let food = await db.run('SELECT f_name, Cast ((JulianDay(f_expiredate)-JulianDay(\'now\')) As Integer)as daysToEat    ' +
//             'FROM container, user_container, users, food   ' +
//             'where uc_user_id = u_id    ' +
//             'and uc_c_id = c_id   ' +
//             'and f_container_id = c_id ' +
//             'and c_id = $cid ' +
//             'and u_id = $uid ' +
//             'order by daysToEat asc '
//             ,{
//                 $uid: uid,
//                 $cid: cid
//             });
//
//
//         res.send(item);
//
//     } catch (e) {
//         console.log(e);
//         return res.sendStatus(404);
//     }
// }
// exports.getItem = getItem;


async function createItem(req, res) {
    try {

        let containerID= await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $1 ' +
            'and uc_user_id = $2 ',
            [req.params.id, req.user.id]
        );

        if (!containerID) return res.status(400).send ("User doesn't own container");

        await db.run('INSERT INTO item( f_name, f_brand, f_expiredate, f_calories, f_quantity, f_container_id) ' +
            'VALUES ($1, $2, $3, $4, $5, $6)'
            ,[
                req.body.name,
                req.body.brand ,
                req.body.expiration ,
                req.body.calories ,
                req.body.quantity,
                req.body.container_id
            ]);

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.createItem = createItem;


async function updateItem(req, res) {
    try {

        let itemID= await db.get(
            'select f_id ' +
            'from item, user_container ' +
            'where uc_c_id = f_container_id ' +
            'and uc_user_id = $1 ' +
            'and f_id = $2',
            [req.params.id, req.user.id]);

        if (!itemID) return res.status(400).send ("User doesn't own item");

        await db.run('UPDATE item ' +
            'SET f_name = $1, ' +
            'f_brand = $2, ' +
            'f_expiredate = $3, ' +
            'f_calories = $4, ' +
            'f_quantity = $5 ' +
            'where f_id = $6'
            ,[
                req.body.name,
                req.body.brand ,
                req.body.expiration ,
                req.body.calories ,
                req.body.quantity,
                req.params.id
            ]);

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.updateItem = updateItem;


async function deleteItem(req, res) {
    try {

        let itemID= await db.get(
            'select f_id ' +
            'from item, user_container ' +
            'where uc_c_id = f_container_id ' +
            'and uc_user_id = $1 ' +
            'and f_id = $2',
            [req.params.id, req.user.id]
        );

        if (!itemID) return res.status(400).send ("User doesn't own item");

        await db.run(
            'DELETE ' +
            'FROM item ' +
            'where f_id = $1',
            [req.params.id]
        );

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.deleteItem = deleteItem;