const { client } = require('./connection');

async function run(query, values) {
    return (await (await client).query(query, values)).rows;
}

async function get(query, values) {
    return (await run(query, values))[0];
}

// --- User ---
async function getUserLogin(username) {
    return get(
        'Select u_username as username, u_password as hash from users where u_username = $1',
        [username]
    );
}
exports.getUserLogin = getUserLogin;

async function isUsernameTaken(username) {
    let user = await get(
        'Select * from users where u_username = $1',
        [username]
    );
    return Boolean(user);
}
exports.isUsernameTaken = isUsernameTaken;

async function getCurrentUser(userID) {
    return get(
        'select u_username as username, u_name as name, u_email as email, u_type as type from users where u_id = $1',
        { $id: userID}
    );
}
exports.getCurrentUser = getCurrentUser;

async function identifyUser(username) {
    return get(
        'Select u_id as id, u_type as type, u_username as username ' +
        'from users where u_username = $1',
        [username]
    );
}
exports.identifyUser = identifyUser;

async function createUser(username, password, email, name, type) {
    return run(
        `Insert into users(u_username, u_password, u_email, u_name, u_type) values($1, $2, $3, $4, $5)`,
        [username, password, email, name, type]
    );
}
exports.createUser = createUser;

async function findUserID(username) {
    return get(
        'select u_id as id ' +
        'from users ' +
        'where u_username = $1',
        [username]
    );
}
exports.findUserID = findUserID;


// --- Container ---

async function listContainers(userID) {
    return run('SELECT c_id as id, c_name as name, c_type as type ' +
        'FROM container, user_container, users ' +
        'where uc_user_id = u_id ' +
        'and uc_c_id = c_id ' +
        'and u_id = $1',
        [userID]
    );
}
exports.listContainers = listContainers;

async function getContainerInfo(containerID, userID) {
    return get(
        'SELECT c_id as id, c_name as name, c_type as type ' +
        'FROM container, user_container ' +
        'WHERE uc_c_id = $1 ' +
        'AND uc_user_id = $2 ' +
        'AND uc_c_id = c_id',
        [containerID, userID]);
}
exports.getContainerInfo = getContainerInfo;

async function getContainerContents(containerID) {
    return run(
        'Select f_id as id, f_brand as brand, f_name as name, to_char(f_expiredate, \'MM/DD/YYYY\') as expiration, f_calories as calories, f_quantity as quantity ' +
        'from item where f_container_id = $1',
        [containerID]
    );
}
exports.getContainerContents = getContainerContents;

async function createContainer(name, type, userID) {
    let newContainer = await get('INSERT INTO ' +
        'container (c_name, c_type) ' +
        'VALUES ($1, $2) returning c_id as id',
        [name, type]
    );

    return run(
        'INSERT INTO user_container (uc_c_id, uc_user_id) VALUES ($1, $2)',
        [newContainer.id, userID]
    );
}
exports.createContainer = createContainer;

async function userOwnsContainer(userID, containerID) {

    let containerId = await run(
        'select uc_c_id ' +
        'from user_container ' +
        'where uc_c_id = $1 ' +
        'and uc_user_id = $2 '
        ,[containerID, userID]
    );

    return Boolean(containerId);

}
exports.userOwnsContainer = userOwnsContainer;

async function updateContainer(containerID, name, type) {
    return run('UPDATE container ' +
        'SET c_name = $1, c_type = $2 ' +
        'WHERE c_id = $3'
        ,[
            name,
            type,
            containerID
        ]);
}
exports.updateContainer = updateContainer;

async function deleteContainer(containerID) {
    return run(
        'DELETE ' +
        'FROM container ' +
        'where c_id = $1',
        [containerID]
    );
}
exports.deleteContainer = deleteContainer;

async function addUserToContainer(containerID, userID) {
    return run('INSERT INTO user_container (uc_c_id, uc_user_id) VALUES ($1, $2)',
        [containerID, userID]
    );
}
exports.addUserToContainer = addUserToContainer;

async function getContainerUsers(containerID) {
    return run(
        'select u_id as id, u_username as username ' +
        'from user_container, users ' +
        'where uc_c_id = $1 ' +
        'and uc_user_id = u_id',
        [containerID]
    );
}
exports.getContainerUsers = getContainerUsers;


// --- Item ---

async function createItem(name, brand, expiration, calories, quantity, containerID) {

    return run('INSERT INTO item( f_name, f_brand, f_expiredate, f_calories, f_quantity, f_container_id) ' +
        'VALUES ($1, $2, $3, $4, $5, $6) returning f_id'
        ,[
            name,
            brand ,
            expiration ,
            calories ,
            quantity,
            containerID
        ]);
}
exports.createItem = createItem;

async function userOwnsItem(userID, itemID) {
    let item = await get(
        'select f_id ' +
        'from item, user_container ' +
        'where uc_c_id = f_container_id ' +
        'and uc_user_id = $1 ' +
        'and f_id = $2',
        [itemID, userID]);
    return Boolean(item);
}
exports.userOwnsItem = userOwnsItem;

async function updateItem(name, brand, expiration, calories, quantity, id) {
    return run('UPDATE item ' +
        'SET f_name = $1, ' +
        'f_brand = $2, ' +
        'f_expiredate = $3, ' +
        'f_calories = $4, ' +
        'f_quantity = $5 ' +
        'where f_id = $6',
        [
            name,
            brand ,
            expiration ,
            calories ,
            quantity,
            id
        ]);
}
exports.updateItem = updateItem;

async function deleteItem(itemID) {
    return run(
        'DELETE ' +
        'FROM item ' +
        'where f_id = $1',
        [itemID]
    );
}
exports.deleteItem = deleteItem;
