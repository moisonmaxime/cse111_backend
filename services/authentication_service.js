const db = require('../db_manager'),
    { hashPassword, checkPassword, signJWT } = require('../auth');

async function login(req, res) {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let response = await db.get(
            'Select u_username as username, u_password as hash from user where username = $username',
            { $username: username}
        );

        if (!response) return res.status(400).send("Invalid credentials");

        let match = checkPassword(password, response.hash);

        if (!match) return res.status(400).send("Invalid credentials");

        Error(500);
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

        let usersWithSameUsername = await db.all(
            'select u_username from user where u_username = $username',
            { $username: username }
        );

        if (usersWithSameUsername.length > 0) return res.status(409).send('User already exists');

        await db.run(
            'Insert into user(u_username, u_password, u_email, u_name, u_type) values($username, $password, $email, $name, $type)',
            {
                $username: username,
                $password: password,
                $email: email,
                $name: name,
                $type: "user"
            }
        );

        return res.status(200).send({ token: signJWT(username) });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.register = register;