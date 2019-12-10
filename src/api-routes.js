let router = require('express').Router();

let sensorDataController = require('./controllers/sensorDataController');
let sensorController = require('./controllers/sensorController');
let sensorPackageController = require('./controllers/sensorPackageController');
let userController = require('./controllers/userController');

let mqttHandler = require('./messaging/mqttHandler');

let _mqttClient = null;
function setMqttClient(mqttClient)
{
    _mqttClient = mqttClient;
}

router.route('/sensorData')
    .get(sensorDataController.getall)
    .post(sensorDataController.new);
router.route('/sensorData/:sensorData_id')
    .get(sensorDataController.getId)
    .put(sensorDataController.update)
    .delete(sensorDataController.delete);
router.route('/sensorData/name/:sensorData_name')
    .get(sensorDataController.getAllName);
router.route('/sensorData/sensorid/:sensorData_sensorid')
    .get(sensorDataController.getAllSensorId);
router.route('/sensorData/timestamp/:sensorData_timestamp')
    .get(sensorDataController.getAllTimestamp);
router.route('/sensorData/query')
    .post(sensorDataController.getAllQuery);

router.route('/sensors')
    .get(sensorController.getall)
    .post(sensorController.new);
router.route('/sensors/:sensor_id')
    .get(sensorController.getId)
    .put(sensorController.update)
    .delete(sensorController.delete);
router.route('/sensors/name/:sensor_name')
    .get(sensorController.getAllName);
router.route('/sensors/master/:sensor_master')
    .get(sensorController.getAllMaster);
router.route('/sensors/query')
    .post(sensorController.getAllQuery);

router.route('/sensorPackages')
    .get(sensorPackageController.getall)
    .post(sensorPackageController.new);
router.route('/sensorPackages/:sensorPackage_id')
    .get(sensorPackageController.getId)
    .put(sensorPackageController.update)
    .delete(sensorPackageController.delete);
router.route('/sensorPackages/name/:sensorPackage_name')
    .get(sensorPackageController.getAllName);
router.route('/sensorPackages/owner/:sensorPackage_owner')
    .get(sensorPackageController.getAllOwner);
router.route('/sensorPackages/query')
    .post(sensorPackageController.getAllQuery);

router.route('/users')
    .get(userController.getall)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.getId)
    .put(userController.update)
    .delete(userController.delete);
router.route('/users/name/:user_name')
    .get(userController.getAllName);
router.route('/users/email/:user_email')
    .get(userController.getAllEmail);
router.route('/users/query')
    .post(userController.getAllQuery);

router.route('/leds')
    .put(function (req, res) {
        let ledId = req.body.ledId;
        let ledValue = req.body.ledValue;

        let result = mqttHandler.setLEDBrightness(ledId, ledValue, _mqttClient);
        if (result) {
            res.json({
                message: "Sent LED update message."
            })
        } else
        {
            res.json({
                message: "LED update could not be sent."
            })
        }
    });

module.exports = router;
module.exports.setMqttClient = setMqttClient;
