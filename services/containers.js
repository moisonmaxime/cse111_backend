let db = require('../db_manager');

async function listContainers(req, res) {
    try {

        let containers = await db.all('SELECT c_id as id, c_name as name, c_type as type ' +
            'FROM container, user_container, users ' +
            'where uc_user_id = u_id ' +
            'and uc_c_id = c_id ' +
            'and u_id = $id',
            { $id: req.user.id });

        return res.send(containers);

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

        let items = await db.all(
            'SELECT f_id as id, f_name as name, f_brand as brand, ' +
            'f_expiredate as expiration, f_calories as calories, f_quantity as quantity ' +
            'FROM item ' +
            'WHERE f_container_id = $id',
            {
                $id: req.params.id
            });

        return res.send({
            id: containerInfo.id,
            name: containerInfo.name,
            type: containerInfo.type,
            items: items
        });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.getContents = getContents;


async function createContainer(req, res) {
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

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.createContainer = createContainer;


async function updateContainer(req, res) {
    try {

        let containerId = await db.get(
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

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.updateContainer = updateContainer;

async function deleteContainer(req, res) {
    try {

        let containerId = await db.get(
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

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.deleteContainer = deleteContainer;

async function addUserToContainer(req, res) {
    try {

        let containerId = await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $cid ' +
            'and uc_user_id = $uid '
            ,{ $cid: req.params.id, $uid: req.user.id }
        );
        if (!containerId) return res.status(400).send ("User doesn't own container");

        let newUser = await db.get(
            'select u_id as id ' +
            'from users ' +
            'where u_username = $username'
            ,{ $username: req.body.username }
        );

        if(!newUser) return res.status(404).send ("User does not exist");

        await db.run('INSERT INTO user_container (uc_c_id, uc_user_id) VALUES ($container, $user)',
            { $container: req.params.id, $user: newUser.id});

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.addUserToContainer = addUserToContainer;

async function listUsers(req, res) {
    try {

        let containerId = await db.get(
            'select uc_c_id ' +
            'from user_container ' +
            'where uc_c_id = $cid ' +
            'and uc_user_id = $uid '
            ,{ $cid: req.params.id, $uid: req.user.id }
        );
        if (!containerId) return res.status(400).send ("User doesn't own container");

        let users = await db.all(
            'select u_id as id, u_username as username ' +
            'from user_container, users ' +
            'where uc_c_id = $id ' +
            'and uc_user_id = u_id'
            ,{ $id: req.params.id }
        );

        return res.send(users);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.listUsers = listUsers;