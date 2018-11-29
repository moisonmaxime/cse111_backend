let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.json());


// --- Middleware ---
let { identify } = require('./middleware/authenticator')
app.use(identify());

let log = require('./middleware/logger');
app.use(log());


// --- Endpoints ---
let auth = require('./endpoints/authentication_endpoint');
auth(app);

let index = require('./endpoints/index_endpoint');
index(app);

let users = require('./endpoints/users_endpoint');
users(app);

let containers = require('./endpoints/containers_endpoint');
containers(app);

let food = require('./endpoints/food_endpoint');
food(app);

let drink = require('./endpoints/drink_endpoint');
drink(app);


// --- Exit (404) ---
// TODO: exit function

app.listen(port, () => {
    console.log('REST API server started on: ' + port);
});
