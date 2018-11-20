let db = require('../db_manager');

async function getCurrentUser(req, res) {
    try {
        let user = await db.get(`
        select u_username as username, u_name as name, u_email as email, u_type as type 
        from user 
        where u_id = $id
        `,{ $id: req.user.id });
        res.send(user);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
};
exports.getCurrentUser = getCurrentUser;