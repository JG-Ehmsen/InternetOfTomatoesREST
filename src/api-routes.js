let router = require('express').Router();

let sensorDataController = require('./controllers/sensorDataController');
let sensorController = require('./controllers/sensorController');
let sensorPackageController = require('./controllers/sensorPackageController');

let mqttHandler = require('./messaging/mqttHandler');

let _mqttClient = null;
function setMqttClient(mqttClient)
{
    _mqttClient = mqttClient;
}

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
