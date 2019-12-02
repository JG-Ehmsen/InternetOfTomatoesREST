let router = require('express').Router();

var sensorDataController = require('./controllers/sensorDataController');
var sensorController = require('./controllers/sensorController');
var sensorPackageController = require('./controllers/sensorPackageController');

router.route('/sensorData')
    .get(sensorDataController.getall)
    .post(sensorDataController.new);
router.route('/sensors/:sensor_id')
    .get(sensorDataController.get)
    .put(sensorDataController.update)
    .delete(sensorDataController.delete);

router.route('/sensors')
    .get(sensorController.getall)
    .post(sensorController.new);
router.route('/sensors/:sensor_id')
    .get(sensorController.get)
    .put(sensorController.update)
    .delete(sensorController.delete);

router.route('/sensorPackages')
    .get(sensorPackageController.getall)
    .post(sensorPackageController.new);
router.route('/sensors/:sensor_id')
    .get(sensorPackageController.get)
    .put(sensorPackageController.update)
    .delete(sensorPackageController.delete);

module.exports = router;
