'use strict';


var mongoose = require('mongoose');
var Enemy = mongoose.model('Enemy');

exports.get_all_enemies = function(req, res) {
    Enemy.find({}, function(err, enemies) {
        if(err) {
            res.send(err);
        } else {
            res.json(enemies);
        }
    });
};

exports.add_enemy = function(req, res) {
    var new_enemy = new Enemy(req.body);

    new_enemy.save(function(err, enemy) {
        if (err) {
            res.send(err);
            res.json(enemy);
        }
        else {
            res.send("Enemy added!");
        }
    });
};

exports.get_enemy_by_name = function(req, res) {
    Enemy.findOne({ name: req.params.name }, function(err, enemy) {
        if(err) {
            res.send(err);
        } 
        else {
            res.json(enemy);
        }
    });
};

exports.get_enemy_by_id = function(req, res) {
    Enemy.findById(req.params._id, function(err, enemy) {
        if(err) {
            res.send(err);
        } 
        else {
            res.json(enemy);
        }
    });
};

exports.update_enemy_by_id = function(req, res) {
    Enemy.findByIdAndUpdate(req.params._id, req.body, { new: true }, function(err, enemy) {
        if(err) {
            res.send(err);
        } 
        else {
            res.json(enemy);
        }
    });
};

exports.delete_enemy_by_id = function(req, res) {
    Enemy.findByIdAndRemove(req.params._id, function(err, response) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send("Enemy deleted!");
        }
    });
};