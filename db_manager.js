let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('fridge.db');

async function get(query, dict) {
    return new Promise((resolve, reject) => db.get(query, dict,
        function (e, r)  {
            if (e) {
                return reject(e);
            }
            return resolve(r);
        }));
}
exports.get = get;

async function all(query, dict) {
    return new Promise((resolve, reject) => db.all(query, dict,
        function (e, r)  {
            if (e) {
                return reject(e);
            }
            return resolve(r);
        }));
}
exports.all = all;

function run(query, dict) {
    return new Promise((resolve, reject) => db.run(query, dict,
        function (e)  {
            if (e) {
                return reject(e);
            }
            return resolve(this.lastID);
        }));
}
exports.run = run;



async function getUserLogin(username) {
    return get(
        'Select u_username as username, u_password as hash from user where username = $username',
        { $username: username}
    );
}
exports.getUserLogin = getUserLogin;

async function isUsernameTaken(username) {
    let user = await get(
        'Select * from user where u_username = $username',
        { $username: username}
    );
    return (!user) ? false : true;
}
exports.isUsernameTaken = isUsernameTaken;

async function getCurrentUser(userID) {
    return get(
        'select u_username as username, u_name as name, u_email as email, u_type as type from user where u_id = $id',
        { $id: userID}
    );
}
exports.getCurrentUser = getCurrentUser;

async function createUser(username, password, email, name, type) {
    return run(
        'Insert into user(u_username, u_password, u_email, u_name, u_type) values($username, $password, $email, $name, $type)',
        {
            $username: username,
            $password: password,
            $email: email,
            $name: name,
            $type: type
        }
    );
}
exports.createUser = createUser;

