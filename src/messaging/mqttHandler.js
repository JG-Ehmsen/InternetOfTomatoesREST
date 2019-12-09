let mqtt = require('mqtt');
SensorData = require('../models/sensorDataModel');

class MqttHandler {
    constructor(host, token) {
        this.mqttClient = null;
        this.host = host;
        this.username = token;
    }

    connect(sensorTopic) {
        //Connect mqtt with credentials (In case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host, {
            username: this.username,
            password: ""
        });

        // Mqtt error callback
        this.mqttClient.on("error", err => {
            console.log(err);
            this.mqttClient.end();
        });

        this.mqttClient.on("close", () => {
            console.log("mqtt client disconnected");
        });

        //Connection callback
        this.mqttClient.on("connect", () => {
            console.log(`mqtt client connected`);
        });

        // Mqtt subscriptions with various topics
        this.mqttClient.subscribe(sensorTopic, { qos: 0 });

        // When a message arrive console log it
        this.mqttClient.on("message", function(topic, message) {
            var jsonMessage = JSON.parse(message);

            var sensorData = new SensorData();
            sensorData.id = jsonMessage.id;
            sensorData.name = jsonMessage.name;
            sensorData.value = jsonMessage.value;
            sensorData.timestamp = jsonMessage.timestamp;
            sensorData.save(function (err) {
                if (err)
                    console.log("Error logging sensor data with message: " + message)
            });
        });
    }

}
// Change an LED brightness
function setLEDBrightness (ledId, ledValue, mqttClient) {

    if (mqttClient && ledId && ledValue) {
        console.log("Set brightness of LED: " + ledId + " to " + ledValue );
        mqttClient.publish(ledId, ledValue);
        return true;
    } else
    {
        console.log("Could not set brightness of LED: " + ledId + " to " + ledValue + ". MqttClient: " + mqttClient);
        return false;
    }
}

module.exports = MqttHandler;
module.exports.setLEDBrightness = setLEDBrightness;
