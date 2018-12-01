let db = require('../db_manager');

async function listContainers(req, res) {
    try {

        let containers = await db.all('SELECT c_id as id, c_name as name, c_type as type ' +
            'FROM container, user_container, user ' +
            'where uc_user_id = u_id ' +
            'and uc_c_id = c_id ' +
            'and u_id = $id',
            { $id: req.user.id });

        res.send(containers);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.listContainers = listContainers;

async function getContents(req, res) {
    try {

        let containerInfo = await db.get(
            'SELECT c_id as id, c_name as name, c_type as type ' +
            'FROM container, user_container ' +
            'WHERE uc_c_id = $id ' +
            'AND uc_user_id = $user_id ' +
            'AND uc_c_id = c_id',
            {
                $id: req.params.id,
                $user_id: req.user.id
            });

        if (!containerInfo) return res.sendStatus(404);

        let foods = await db.all(
            'SELECT f_id as id, f_name as name, f_brand as brand, ' +
            'f_expiredate as expiration, f_calories as calories, f_quantity as quantity ' +
            'FROM food ' +
            'WHERE f_container_id = $id',
            {
                $id: req.params.id
            });

        let drinks = await db.all(
            'SELECT d_id as id, d_name as name, d_brand as brand, ' +
            'd_expiredate as expiration, d_calories as calories, d_quantity as quantity ' +
            'FROM drink ' +
            'WHERE d_container_id = $id',
            {
                $id: req.params.id
            });

        res.send({
            id: containerInfo.id,
            name: containerInfo.name,
            type: containerInfo.type,
            foods: foods,
            drinks: drinks
        });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.getContents = getContents;


async function createContainers(req, res) {
    try {

        let newContainerID = await db.run('INSERT INTO ' +
            'container (c_name, c_type) ' +
            'VALUES ($name, $type)',
            {
                $name: req.body.name,
                $type: req.body.type
            });

        await db.run('INSERT INTO user_container (uc_c_id, uc_user_id) VALUES ($container, $user)',
            { $container: newContainerID, $user: req.user.id});

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.createContainers = createContainers;


async function updateContainers(req, res) {
    try {

        let containerId= await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $cid ' +
            'and uc_user_id = $uid '
            ,{ $cid: req.params.id, $uid: req.user.id }
        );

        if (!containerId) return res.status(400).send ("User doesn't own container");

        await db.run('UPDATE container ' +
            'SET c_name = $name, c_type = $type ' +
            'WHERE c_id = $id'
            ,{
                $id: req.params.id,
                $name: req.body.name,
                $type: req.body.type
            });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.updateContainers = updateContainers;

async function deleteContainers(req, res) {
    try {

        let containerId= await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $cid ' +
            'and uc_user_id = $uid '
            ,{ $cid: req.params.id, $uid: req.user.id }
        );

        if (!containerId) return res.status(400).send ("User doesn't own container");

        await db.run('DELETE ' +
            'FROM container ' +
            'where c_id = $id'
            ,{ $id: req.params.id });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.deleteContainers = deleteContainers;