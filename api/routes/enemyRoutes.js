'use strict';

module.exports = function(app) {
    const enemyController = require('../controllers/enemyController');
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/pictures')
        },
        filename: function (req, file, cb) {
            var imgPath = Date.now() + file.originalname;
          cb(null, imgPath)
        }
    });
    
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
    
    let upload = multer({ storage: storage, fileFilter: fileFilter });

    app.route('/enemy').post(tokenAuthenticator.authenticate, upload.single('image'), enemyController.add_enemy);

    app.route('/enemy/:_id')
        .get(enemyController.get_enemy_by_id)
        .put(tokenAuthenticator.authenticate, upload.single('image'), enemyController.update_enemy_by_id)
        .delete(tokenAuthenticator.authenticate, enemyController.delete_enemy_by_id);
    
    app.route('/enemy/getByName/:name').get(tokenAuthenticator.authenticate, enemyController.get_enemy_by_name);
};