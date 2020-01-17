'use strict';

module.exports = function(app) {
    const playerController = require('../controllers/playerController');
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');

    app.route('/register').post(playerController.register);

    app.route('/login').post(playerController.login);

    app.route('/players').get(tokenAuthenticator.authenticate, playerController.get_all_players);
};