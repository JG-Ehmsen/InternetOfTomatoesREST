var mongoose = require('mongoose');

var sensorPackageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});


var SensorPackage = module.exports = mongoose.model('sensorPackage', sensorPackageSchema);
module.exports.get = function (callback, limit) {
    SensorPackage.find(callback).limit(limit);
}
