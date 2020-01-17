'use strict';


var mongoose = require('mongoose');
var Player = mongoose.model('Player');

exports.get_all_players = function(req, res) {
    Player.find({}, function(err, players) {
        if (err) {
            res.send(err);
        } 
        else {
            res.json(players);
        }
    });
};

exports.register = function(req, res) {
    var new_player = new Player(req.body);
    new_player.setPassword(req.body.password);

    new_player.save(function(err, player) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Registration successful!");
        }
    });
};

exports.login = function(req, res) {
    Player.findOne({ name: req.body.name }, function(err, player) {
        if (err) {
            res.send(err);
        } else if (player === null || !player.validatePassword(req.body.password)) {
            res.send("Authentication failed!");
        }
        else {
            var token = player.generateAuthToken();
            res.json({token: token});
        }
    });
};