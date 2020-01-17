require('dotenv').config();

var express = require('express');
var app = express();
app.set('view engine', 'pug');
var port = process.env.PORT;
var mongoose = require('mongoose');
var Player = require('./api/models/player');
var Enemy = require('./api/models/Enemy');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var playerRoutes = require('./api/routes/playerRoutes');
playerRoutes(app);
var enemyRoutes = require('./api/routes/enemyRoutes');
enemyRoutes(app);
var enemiesRoutes = require('./api/routes/enemiesRoutes');
enemiesRoutes(app);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Homepage'
    });
});

app.listen(port);

console.log('Server started on: ' + port);