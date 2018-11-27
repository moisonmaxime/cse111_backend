let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.json());

app.route('/favicon.ico')
    .get((req, res) => {
        res.send({});
    });

let log = require('./middleware/logger');
app.use(log());

let auth = require('./endpoints/authentication_endpoint');
auth(app);

let index = require('./endpoints/index_endpoint');
index(app);

let users = require('./endpoints/users_endpoint');
users(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('REST API server started on: ' + port);
