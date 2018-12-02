let db = require('../db_manager')

// async function getFood(req, res) {
//     try {
//
//         let food = await db.get('SELECT f_name, Cast ((JulianDay(f_expiredate)-JulianDay(\'now\')) As Integer)as daysToEat    ' +
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
//         res.send(food);
//
//     } catch (e) {
//         console.log(e);
//         return res.sendStatus(404);
//     }
// }
// exports.getFood = getFood;


async function createFood(req, res) {
    try {

        let containerID= await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $id ' +
            'and uc_user_id = $user_id ',
            { $id: req.body.container_id, $user_id: req.user.id }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container");

        await db.run('INSERT INTO food( f_name, f_brand, f_expiredate, f_calories, f_quantity, f_container_id) ' +
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
exports.createFood = createFood;


async function updateFood(req, res) {
    try {

        let foodID= await db.get(
            'select f_id ' +
            'from food, user_container ' +
            'where uc_c_id = f_container_id ' +
            'and uc_user_id = $user_id ' +
            'and f_id = $id',
            { $id: req.params.id, $user_id: req.user.id });

        if (!foodID) return res.status(400).send ("User doesn't own food");

        await db.run('UPDATE food ' +
            'SET f_name = $name, ' +
            'f_brand = $brand, ' +
            'f_expiredate = $expiration, ' +
            'f_calories = $calories, ' +
            'f_quantity = $quantity ' +
            'where f_id = $id'
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
exports.updateFood = updateFood;


async function deleteFood(req, res) {
    try {

        let foodID= await db.get(
            'select f_id ' +
            'from food, user_container ' +
            'where uc_c_id = f_container_id ' +
            'and uc_user_id = $user_id ' +
            'and f_id = $id',
            { $id: req.params.id, $user_id: req.user.id });

        if (!foodID) return res.status(400).send ("User doesn't own food");

        await db.run('DELETE ' +
            'FROM food ' +
            'where f_id = $id'
            ,{$id: req.params.id});

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.deleteFood = deleteFood;