let db = require('../db_manager');

async function getContainers(req, res) {
    try {
        let containers = await db.get('SELECT c_name ' +
            'FROM container, user_container, user ' +
            'where uc_user_id = u_id ' +
            'and uc_c_id = c_id and u_id = $id '
          ,{ $id: req.user.id });
            res.send(containers);
        } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.getContainers = getContainers;

async function getContents(req, res) {
    try {
        let containers = await db.get('SELECT f_name, d_name ' +
            'FROM container, food, drink ' +
            'where  d_container_id = c_id' +
            'and f_container_id = c_id' +
            'and c_name = $cname'
            ,{ $id: req.user.id, $cname: req.body.cname});
        res.send(containers);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.getContents = getContents;

async function createContainers(req, res) {
    try {
        let containers = await db.run('INSERT INTO' +
            'container (c_name, c_type) ' +
            'VALUES ($cname, $ctype)',{ $cname: req.body.cname, $ctype: req.body.ctype });
        res.send(containers);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.createContainers = createContainers;


async function updateContainers(req, res) {
    try {
        let containers = await db.run('UPDATE container' +
            'SET c_name = $cname, c_type= $ctype' +
            'FROM container, user, user_container' +
            'WHERE  c_name = $cname'
            ,{ $id: req.user.id, $cname: req.body.cname, $ctype: req.body.ctype });
        res.send(containers);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.updateContainers = updateContainers;


async function deleteContainers(req, res) {
    try {
        let containers = await db.run('DELETE' +
            'FROM container, user_container, user' +
            'where uc_user_id = u_id' +
            'and uc_c_id = c_id' +
            'and u_id = $id' +
            'and c_name = $cname'
            ,{ $id: req.user.id, $cname: req.body.cname, $ctype: req.body.ctype });
        res.send(containers);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
};
exports.deleteContainers = deleteContainers;