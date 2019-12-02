let mqtt = require('mqtt');
Sensor = require('../models/sensorModel');
SensorData = require('../models/sensorDataModel');

class MqttHandler {
    constructor(host, token) {
        this.mqttClient = null;
        this.host = host;
        this.username = token;
    }

    connect() {
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
        //this.mqttClient.subscribe("mytopic", { qos: 0 });
        this.mqttClient.subscribe("/sensor/#", { qos: 0 });

        // When a message arrive console log it
        this.mqttClient.on("message", function(topic, message) {
            if (topic == "/sensor/*") {
                // DO something e.g. send to DB and websockets
            }
            var jsonMessage = JSON.parse(message);
            //console.log(JSON.parse(message.toString()).name);
            console.log(jsonMessage.id);
            console.log(jsonMessage.name);
            console.log(jsonMessage.value);
            console.log(jsonMessage.timestamp);
            var sensorData = new SensorData();
            sensorData.id = jsonMessage.id;
            sensorData.name = jsonMessage.name;
            sensorData.value = jsonMessage.value;
            sensorData.timestamp = jsonMessage.timestamp;
            sensorData.save(function (err) {
                if (err)
                    res.json(err);
            });
        });

        this.mqttClient.on("close", () => {
            console.log("mqtt client disconnected");
        });
    }

    sendMessage(message) {
        this.mqttClient.publish("mytopic", message);
    }

    setBrightnesLED(value) {
        this.mqttClient.publish("/control/led", value);
    }
}

module.exports = MqttHandler;
