let db = require('../database/queries')

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

        if (!await db.userOwnsContainer(req.user.id, req.body.container_id))
            return res.status(400).send ("User doesn't own container");

        await db.createItem(
            req.body.name,
            req.body.brand ,
            req.body.expiration ,
            req.body.calories ,
            req.body.quantity,
            req.body.container_id
        );

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.createItem = createItem;


async function updateItem(req, res) {
    try {

        if (!await db.userOwnsItem(req.user.id, req.params.id))
            return res.status(400).send ("User doesn't own item");

        await db.updateItem(
            req.body.name,
            req.body.brand ,
            req.body.expiration ,
            req.body.calories ,
            req.body.quantity,
            req.params.id
        );

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.updateItem = updateItem;


async function deleteItem(req, res) {
    try {

        if (!await db.userOwnsItem(req.user.id, req.params.id))
            return res.status(400).send ("User doesn't own item");

        await db.deleteItem(req.params.id)

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.deleteItem = deleteItem;