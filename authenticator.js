let db = require('./db_manager');

// --- Auth Express Middleware ---
function authenticate() {
    return async function(req, res, next) {
        try {
            let token = req.headers.Authorization;
            let foundUser = await db.get('Select u_id as id,  from user where u_token = $token', { $token: token });
            if (!foundUser) return res.status(403).send('Not Authorized');
            req.user = foundUser;
            next();
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
}
exports.authenticate = authenticate