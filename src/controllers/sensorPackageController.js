SensorPackage = require('../models/sensorPackageModel');

exports.getall = function (req, res) {
    SensorPackage.get(function (err, sensorPackages) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else
        res.json({
            status: "success",
            message: "SensorPackages retrieved successfully",
            data: sensorPackages
        });
    });
};

exports.getId = function (req, res) {
    SensorPackage.findById(req.params.sensorPackage_id, function (err, sensorPackage) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'SensorPackage details loading..',
            data: sensorPackage
        });
    });
};

exports.getAllName = function (req, res) {
    SensorPackage.find({ "name": req.params.sensorPackage_name}, function (err, sensorPackages) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'SensorPackages loading..',
            data: sensorPackages
        });
    });
};

exports.getAllOwner = function (req, res) {
    SensorPackage.find({ "owner": req.params.sensorPackage_owner}, function (err, sensorPackages) {
        if (err)
            res.send(err);
        else
        res.json({
            message: 'SensorPackages loading..',
            data: sensorPackages
        });
    });
};

exports.getAllQuery = function (req, res) {
    SensorPackage.find(req.body, function (err, sensorPackage) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'SensorPackage details loading..',
                data: sensorPackage
            });
    });
};

exports.new = function (req, res) {
    let sensorPackage = new SensorPackage();
    sensorPackage.name = req.body.name;
    sensorPackage.owner = req.body.owner
    sensorPackage.save(function (err) {
        if (err)
            res.json(err);
        else
        res.json({
            message: 'New sensorPackage created!',
            data: sensorPackage
        });
    });
};

exports.update = function (req, res) {SensorPackage.findById(req.params.sensorPackage_id, function (err, sensorPackage) {
    if (err)
        res.send(err);
    sensorPackage.name = req.body.name ? req.body.name : sensorPackage.name;
    sensorPackage.owner = req.body.owner ? req.body.owner : sensorPackage.owner;
    sensorPackage.save(function (err) {
        if (err)
            res.json(err);
        else
        res.json({
            message: 'SensorPackage Info updated',
            data: sensorPackage
        });
    });
});
};

exports.delete = function (req, res) {
    SensorPackage.remove({
        _id: req.params.sensorPackage_id
    }, function (err, sensorPackage) {
        if (err)
            res.send(err);
        else
        res.json({
            status: "success",
            message: 'SensorPackage deleted',
            data: sensorPackage
        });
    });
};
