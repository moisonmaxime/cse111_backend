let db = require('../database/db_manager');

async function getCurrentUser(req, res) {
    try {
        let user = await db.getCurrentUser(req.user.id);
        res.send(user);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
};
exports.getCurrentUser = getCurrentUser;