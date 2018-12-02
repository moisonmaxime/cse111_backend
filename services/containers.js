let db = require('../database/queries');

async function listContainers(req, res) {
    try {
        return res.send(await db.listContainers(req.user.id));
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.listContainers = listContainers;

async function getContents(req, res) {
    try {

        let containerInfo = await db.getContainerInfo(req.params.id, req.user.id);
        if (!containerInfo) return res.sendStatus(404);

        let items = await db.getContainerContents(req.params.id);

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

        await db.createContainer(req.body.name, req.body.type, req.user.id);
        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.createContainer = createContainer;


async function updateContainer(req, res) {
    try {

        if (!await db.userOwnsContainer(req.user.id, req.params.id))
            return res.status(400).send ("User doesn't own container");

        await db.updateContainer(req.params.id, req.body.name, req.body.type);

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.updateContainer = updateContainer;

async function deleteContainer(req, res) {
    try {

        if (!await db.userOwnsContainer(req.user.id, req.params.id))
            return res.status(400).send ("User doesn't own container");

        await db.deleteContainer(req.params.id);

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.deleteContainer = deleteContainer;

async function addUserToContainer(req, res) {
    try {

        if (!await db.userOwnsContainer(req.user.id, req.params.id))
            return res.status(400).send ("User doesn't own container");

        let newUser = await db.findUserID(req.body.username);
        if(!newUser) return res.status(404).send ("User does not exist");

        await db.addUserToContainer(req.params.id, newUser.id);

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.addUserToContainer = addUserToContainer;

async function listUsers(req, res) {
    try {

        if (!await db.userOwnsContainer(req.user.id, req.params.id))
            return res.status(400).send ("User doesn't own container");

        let users = await db.getContainerUsers(req.params.id);

        return res.send(users);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.listUsers = listUsers;