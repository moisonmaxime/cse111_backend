const db = require('../database/queries'),
    { hashPassword, checkPassword, signJWT } = require('../auth/auth');

async function login(req, res) {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let response = await db.getUserLogin(username);

        if (!response) return res.status(403).send("Invalid credentials");

        let match = checkPassword(password, response.hash);

        if (!match) return res.status(403).send("Invalid credentials");

        return res.json({ token: signJWT(response.username) });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
};
exports.login = login;

async function register(req, res) {
    try {
        let username = req.body.username;
        let password = await hashPassword(req.body.password);
        let name = req.body.name;
        let email = req.body.email;
        if (await db.isUsernameTaken(username)) return res.status(409).send('User already exists');
        await db.createUser(username, password, email, name, "user");
        return res.status(200).send({ token: signJWT(username) });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.register = register;