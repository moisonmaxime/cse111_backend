let db = require('../db_manager');

async function getCurrentUser(req, res) {
    try {
        console.log(req.user); // Find all info for that user
        // let users = await db.all('select u_username as username from user');
        // res.send(users);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
};
exports.getCurrentUser = getCurrentUser;