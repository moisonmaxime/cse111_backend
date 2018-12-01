function log() {
    return async function (req, res, next) {
        let user = !req.user ? 'Anonymous' : req.user.username;
        let endpoint = req.originalUrl;
        let method = req.method;
        console.log(user + ' - ' + method + ' ' + endpoint);
        next();
    }
}

module.exports = log;