'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var enemySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    health: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    positionX: {
        type: Number,
        min: 0,
        required: true
    },
    positionY: {
        type: Number,
        min: 0,
        required: true
    }
});

module.exports = mongoose.model('Enemy', enemySchema);