let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

let sensorRoutes = require('./routers/sensorRoutes');
let sensorDataRoutes = require('./routers/sensorDataRoutes');
let sensorPackageRoutes = require('./routers/sensorPackageRoutes');
let userRoutes = require('./routers/userRoutes');
let messagingRoutes = require('./routers/messagingRoutes');

let mqttHandler = require("./messaging/mqttHandler.js");
let config = require('../config.json');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use(cors());

app.use('/api/sensorPackages/', sensorPackageRoutes);
app.use('/api/sensors/', sensorRoutes);
app.use('/api/sensorData/', sensorDataRoutes);
app.use('/api/users/', userRoutes);
app.use('/api', messagingRoutes);

const mqttHandle = new mqttHandler(config.flespiHost, config.flespiToken);
mqttHandle.connect(config.sensorTopic);

messagingRoutes.setMqttClient(mqttHandle.mqttClient);

mongoose.connect(config.url + config.db, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


const port = process.env.PORT || config.port;

app.listen(port, function () {
    console.log("Running API on port " + port);
});
