let db = require('../db_manager');

function identify() {
    return async function(req, res, next) {
        try {
            let token = req.headers.bearer;
            if (!token) throw Error("Meh");
            let foundUser = await db.get('Select u_id as id, u_type as type, u_username as username from user where u_token = $token', { $token: token });
            if (!foundUser) throw Error("Meh");
            req.user = foundUser;
            next();
        } catch (e) {
            next();
        }
    }
}
exports.identify = identify;

// --- Auth Express Middleware ---
function authenticate() {
    return async function(req, res, next) {
        try {
            if (!req.user) throw Error('No user authenticated');
            next();
        } catch (e) {
            console.log(e);
            return res.sendStatus(403);
        }
    }
}
exports.authenticate = authenticate