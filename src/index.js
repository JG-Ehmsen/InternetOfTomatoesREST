let express = require('express');
let apiRoutes = require("./api-routes");
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let mqttHandler = require("./messaging/mqttHandler.js");
let config = require('../config.json');

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

const mqttClient = new mqttHandler(config.flespiHost, config.flespiToken);
mqttClient.connect(config.sensorTopic);

mongoose.connect(config.url + config.db, { useNewUrlParser: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


var port = process.env.PORT || config.port;

app.listen(port, function () {
    console.log("Running API on port " + port);
});
