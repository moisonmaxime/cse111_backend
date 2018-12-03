let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// --- Middleware ---
let { identify } = require('./middleware/authenticator');
app.use(identify());

let log = require('./middleware/logger');
app.use(log());


// --- Endpoints ---
let auth = require('./endpoints/authentication');
auth(app);

let index = require('./endpoints/index');
index(app);

let users = require('./endpoints/users');
users(app);

let containers = require('./endpoints/containers');
containers(app);

let item = require('./endpoints/item');
item(app);

app.listen(port, () => {
    console.log('REST API server started on: ' + port);
});
