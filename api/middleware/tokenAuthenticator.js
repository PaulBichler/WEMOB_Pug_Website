const jwt = require('jsonwebtoken');
const player = require('../models/player');

exports.authenticate = function(req, res, next) {
    try {
        const headerData = req.header('Authorization');
        if(!headerData) {
            throw new Error('No Authorization provided. Expecting bearer token!');
        }

        const token = headerData.replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const retrievedPlayer = player.findOne({ name: data.name, 'tokens.token': token });

        if(!retrievedPlayer) {
            throw new Error();
        }
        next();
    }
    catch (error) {
        res.status(401).send({error: 'Not authorized to access this resource', message: error.message});
    }
};