let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.json());

let { identify } = require('./middleware/authenticator')
app.use(identify());

let log = require('./middleware/logger');
app.use(log());

let auth = require('./endpoints/authentication_endpoint');
auth(app);

let index = require('./endpoints/index_endpoint');
index(app);

let users = require('./endpoints/users_endpoint');
users(app);

app.listen(port);

console.log('REST API server started on: ' + port);
