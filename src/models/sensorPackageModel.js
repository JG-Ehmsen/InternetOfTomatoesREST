let mongoose = require('mongoose');

let sensorPackageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});


let SensorPackage = module.exports = mongoose.model('sensorPackage', sensorPackageSchema);
module.exports.get = function (callback, limit) {
    SensorPackage.find(callback).limit(limit);
}
