'use strict';

module.exports = function(app) {
    const enemyController = require('../controllers/enemyController');
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');

    app.route('/enemy').post(tokenAuthenticator.authenticate, enemyController.add_enemy);

    app.route('/enemy/:_id')
        .get(tokenAuthenticator.authenticate, enemyController.get_enemy_by_id)
        .put(tokenAuthenticator.authenticate, enemyController.update_enemy_by_id)
        .delete(tokenAuthenticator.authenticate, enemyController.delete_enemy_by_id);
    
    app.route('/enemy/getByName/:name').get(tokenAuthenticator.authenticate, enemyController.get_enemy_by_name);
};