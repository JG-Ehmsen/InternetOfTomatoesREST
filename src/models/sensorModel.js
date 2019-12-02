var mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    master: {
        type: String,
        required: true
    }
});


var Sensor = module.exports = mongoose.model('sensor', sensorSchema);
module.exports.get = function (callback, limit) {
    Sensor.find(callback).limit(limit);
}
