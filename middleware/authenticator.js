const { verifyJWT } = require('../auth/auth');
const db = require('../database/queries');


function identify() {
    return async function(req, res, next) {
        try {
            let token = !req.headers.authorization ? undefined : req.headers.authorization.split(' ')[1];
            if (!token) throw Error("User did not provide token");
            let username = verifyJWT(token);
            if (!username) throw Error("Could not find matching token");
            let foundUser = await db.identifyUser(username);
            if (!foundUser) throw Error("User does not exist");
            req.user = foundUser;
            next();
        } catch (e) {
            // console.log(e);
            next();
        }
    }
}
exports.identify = identify;


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
exports.authenticate = authenticate;