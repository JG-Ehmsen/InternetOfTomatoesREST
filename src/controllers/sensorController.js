Sensor = require('../models/sensorModel');

exports.getall = function (req, res) {
    Sensor.get(function (err, sensors) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else
        res.json({
            status: "success",
            message: "Sensors retrieved successfully",
            data: sensors
        });
    });
};

exports.getId = function (req, res) {
    Sensor.findById(req.params.sensor_id, function (err, sensor) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'Sensor details loading..',
            data: sensor
        });
    });
};

exports.getAllName = function (req, res) {
    Sensor.find({ "name": req.params.sensor_name}, function (err, sensors) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'Sensor details loading..',
            data: sensors
        });
    });
};

exports.getAllMaster = function (req, res) {
    Sensor.find({ "master": req.params.sensor_master}, function (err, sensors) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'Sensor details loading..',
            data: sensors
        });
    });
};

exports.new = function (req, res) {
    let sensor = new Sensor();
    sensor.name = req.body.name;
    sensor.master = req.body.master
    sensor.save(function (err) {
        if (err)
            res.json(err);
        else
        res.json({
            message: 'New sensor created!',
            data: sensor
        });
    });
};

exports.update = function (req, res) {Sensor.findById(req.params.sensor_id, function (err, sensor) {
    if (err)
        res.send(err);
    sensor.name = req.body.name ? req.body.name : sensor.name;
    sensor.master = req.body.master ? req.body.master : sensor.master;
    sensor.save(function (err) {
        if (err)
            res.json(err);
        else
        res.json({
            message: 'Sensor Info updated',
            data: sensor
        });
    });
});
};

exports.delete = function (req, res) {
    Sensor.remove({
        _id: req.params.sensor_id
    }, function (err, sensor) {
        if (err)
            res.send(err);
        else
        res.json({
            status: "success",
            message: 'Sensor deleted'
        });
    });
};
