let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    { validator } = require('./joi_validator');

app.use(express.json());

let auth = require('./endpoints/authentication_endpoint');
auth(app);

let index = require('./endpoints/index_endpoint');
index(app);

let users = require('./endpoints/users_endpoint');
users(app);

let containers = require('./endpoints/containers_endpoint');
containers(app);

let foods = require('./endpoints/food_endpoint');
foods(app);

let drinks = require('./endpoints/drink_endpoint');
drinks(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('REST API server started on: ' + port);
