let db = require('../db_manager');

async function getContainer(req, res) {
    try {

        let uid = req.params.uid;
        let cid = req.params.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_u_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");

        await db.all('SELECT c_name ' +
            'FROM container, user_container, user' +
            'where uc_user_id = u_id ' +
            'and uc_c_id = c_id ' +
            'and u_id = $id '
            ,{ $id: req.user.id });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.getContainer = getContainer;

async function getContents(req, res) {
    try {

        let uid = req.params.uid;
        let cid = req.params.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_u_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");

        await db.all('SELECT f_name, d_name ' +
            'FROM container, food, drink ' +
            'where  d_container_id = c_id' +
            'and f_container_id = c_id' +
            'and c_id = $cid'
            ,{
                $id: req.user.id,
                $cid: req.params.cid
        });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.getContents = getContents;


async function createContainers(req, res) {
    try {

        let uid = req.body.uid;

        let containerID= await db.get(
            'select u_id ' +
            'from user' +
            'where u_id = $uid'
            ,
            { $uid: uid}
        );

        if (!containerID) return res.status(400).send ("User doesn't exist.");

        await db.run('INSERT INTO' +
            'container (c_name, c_type) ' +
            'VALUES ($cname, $ctype)',
            {
                $cname: req.body.cname,
                $ctype: req.body.ctype
            });


        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.createContainers = createContainers;


async function updateContainers(req, res) {
    try {

        let uid = req.body.uid;
        let cid = req.body.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_u_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");


        await db.run('UPDATE container' +
            'SET c_name = $cname, ' +
            'c_type= $ctype' +
            'FROM container' +
            'WHERE  c_name = $cname'
            ,{
                $cname: req.body.cname,
                $ctype: req.body.ctype
            });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.updateContainers = updateContainers;

async function deleteContainers(req, res) {
    try {

        let uid = req.params.uid;
        let cid = req.params.cid;

        let containerID= await db.get(
            'select c_id ' +
            'from user_container, container, user' +
            'where c_id = $cid' +
            'and uc_c_id = c_id' +
            'and uc_u_id = u_id' +
            'and u_id = $uid'
            ,
            { $cid: cid, $uid:uid }
        );

        if (!containerID) return res.status(400).send ("User doesn't own container.");


        await db.run('DELETE' +
            'FROM container, user_container, user' +
            'where uc_user_id = u_id' +
            'and uc_c_id = c_id' +
            'and u_id = $uid' +
            'and c_id = $cid'
            ,{
                $uid: req.user.uid,
                $cid: req.params.cid
            });

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
}
exports.deleteContainers = deleteContainers;