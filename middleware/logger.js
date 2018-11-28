function log() {
    return async function (req, res, next) {
        let user = !req.user ? 'Anonymous' : req.user.username;
        let endpoint = req.originalUrl;
        console.log(user + ' - ' + endpoint);
        next();
    }
}

module.exports = log;