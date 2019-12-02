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

        //Connection callback
        this.mqttClient.on("connect", () => {
            console.log(`mqtt client connected`);
        });

        // Mqtt subscriptions with various topics
        this.mqttClient.subscribe(sensorTopic, { qos: 0 });

        // When a message arrive console log it
        this.mqttClient.on("message", function(topic, message) {
            var jsonMessage = JSON.parse(message);
            /*
            console.log("SensorID: " + jsonMessage.id);
            console.log("SensorType: " + jsonMessage.name);
            console.log("SensorValue: " + jsonMessage.value);
            console.log("SensorTimestamp: " + jsonMessage.timestamp);
            */
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

        this.mqttClient.on("close", () => {
            console.log("mqtt client disconnected");
        });
    }

    setBrightnesLED(value) {
        this.mqttClient.publish("/control/led", value);
    }
}

function fe(item, index)
{
    this.mqttClient.subscribe(item, { qos: 0 });
}

module.exports = MqttHandler;
