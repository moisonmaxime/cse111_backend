let db = require('../db_manager'),
    bcrypt = require('bcrypt'),
    tokenGen = require('apikeygen');

async function login(req, res) {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let response = await db.get(
            'Select u_token as key, u_password as hash from user where u_username = $username',
            { $username: username}
        );

        if (response) {
            let match = bcrypt.compareSync(password, response.hash);
            if (match) return res.json({ token: response.key });
            return res.status(400).send("Invalid credentials");
        }

        return res.status(400).send("Invalid credentials");

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
};

exports.login = login;

async function register(req, res) {
    try {
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let name = req.body.name;
        let email = req.body.email;
        let token = tokenGen.apikey(255);

        let userWithSameUsername = await db.all(
            'select u_username from user where u_username = $username',
            { $username: username }
        );

        if (userWithSameUsername.length > 0) return res.status(409).send('User already exists');

        await db.run(
            'Insert into user(u_username, u_password, u_email, u_name, u_token, u_type) values($username, $password, $email, $name, $token, $type)',
            {
                $username: username,
                $password: password,
                $email: email,
                $name: name,
                $token: token,
                $type: "user"
            }
        );

        return res.status(200).send({ token: token });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
exports.register = register;