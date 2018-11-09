let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    expressValidator = require("express-validator");;

app.use(express.json());
app.use(expressValidator());

let auth = require('./endpoints/authentication_endpoint');
auth(app);

let index = require('./endpoints/index_endpoint');
index(app);

let users = require('./endpoints/users_endpoint');
users(app);

let containers = require('./endpoints/containers_endpoint');
containers(app);


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('REST API server started on: ' + port);