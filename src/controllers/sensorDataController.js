let io = require('socket.io')(3001);
SensorData = require('../models/sensorDataModel');

// ----- Socket IO Setup -----
let _socket = null;
io.on('connection', function(socket) {
    console.log('a client connected');
    _socket = socket;
});

let defaultResponseSize = 30;

exports.getall = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    SensorData.find(function (err, sensorData) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else
        res.json({
            status: "success",
            message: "SensorData retrieved successfully",
            data: sensorData
        });
    }).sort({'timestamp': 'desc'}).limit(parseInt(limit));
};

exports.getId = function (req, res) {
    SensorData.findById(req.params.sensorData_id, function (err, sensorData) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    });
};

exports.getAllSensorId = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    SensorData.find({ "id": req.params.sensorData_sensorid}, function (err, sensorData) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    }).sort({'timestamp': 'desc'}).limit(parseInt(limit));
};

exports.getAllName = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    SensorData.find({ "name": req.params.sensorData_name}, function (err, sensorData) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    }).sort({'timestamp': 'desc'}).limit(parseInt(limit));
};

exports.getAllTimestamp = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    SensorData.find({ "timestamp": req.params.sensorData_timestamp}, function (err, sensorData) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    }).sort({'timestamp': 'desc'}).limit(parseInt(limit));
};

exports.getAllQuery = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    SensorData.find(req.body, function (err, sensorData) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'SensorData details loading..',
                data: sensorData
            });
    }).sort({'timestamp': 'desc'}).limit(parseInt(limit));
};

exports.new = function (req, res) {
    let sensorData = new SensorData();
    sensorData.id = req.body.id;
    sensorData.name = req.body.name;
    sensorData.value = req.body.value;
    sensorData.timestamp = req.body.timestamp;
    sensorData.save(function (err) {
        if (err)
            res.json(err);
        else {
            _socket.emit('sensordata/' + sensorData.id, {
                id: sensorData.id,
                name: sensorData.name,
                value: sensorData.value,
                timestamp: sensorData.timestamp});
            res.json({
                message: 'New sensorData created!',
                data: sensorData
            });
        }
    });
};

exports.update = function (req, res) {SensorData.findById(req.params.sensorData_id, function (err, sensorData) {
    if (err)
        res.send(err);
    sensorData.id = req.body.id ? req.body.id : sensorData.id;
    sensorData.name = req.body.name ? req.body.name : sensorData.name;
    sensorData.value = req.body.value ? req.body.value : sensorData.value;
    sensorData.timestamp = req.body.timestamp ? req.body.timestamp : sensorData.timestamp;
    sensorData.save(function (err) {
        if (err)
            res.json(err);
        else
        res.json({
            message: 'SensorData Info updated',
            data: sensorData
        });
    });
});
};

exports.delete = function (req, res) {
    SensorData.remove({
        _id: req.params.sensorData_id
    }, function (err, sensorData) {
        if (err)
            res.send(err);
        else
        res.json({
            status: "success",
            message: 'SensorData deleted',
            data: sensorData
        });
    });
};
