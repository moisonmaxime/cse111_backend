function log() {
    return async function (req, res, next) {
        console.log(req.originalUrl);
        next();
    }
}

module.exports = log;