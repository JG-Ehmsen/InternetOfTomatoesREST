SensorData = require('../models/sensorDataModel');

exports.getall = function (req, res) {
    SensorData.get(function (err, sensorData) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "SensorData retrieved successfully",
            data: sensorData
        });
    });
};

exports.getId = function (req, res) {
    SensorData.findById(req.params.sensorData_id, function (err, sensorData) {
        if (err)
            res.send(err);
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    });
};

exports.getAllSensorId = function (req, res) {
    SensorData.find({ "id": req.params.sensorData_sensorid}, function (err, sensorData) {
        if (err)
            res.send(err);
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    });
};

exports.getAllName = function (req, res) {
    SensorData.find({ "name": req.params.sensorData_name}, function (err, sensorData) {
        if (err)
            res.send(err);
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    });
};

exports.getAllTimestamp = function (req, res) {
    SensorData.find({ "timestamp": req.params.sensorData_timestamp}, function (err, sensorData) {
        if (err)
            res.send(err);
        res.json({
            message: 'SensorData details loading..',
            data: sensorData
        });
    });
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
        res.json({
            message: 'New sensorData created!',
            data: sensorData
        });
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
        res.json({
            status: "success",
            message: 'SensorData deleted'
        });
    });
};
