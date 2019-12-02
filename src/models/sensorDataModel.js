var mongoose = require('mongoose');

var sensorDataSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});


var SensorData = module.exports = mongoose.model('sensorData', sensorDataSchema);
module.exports.get = function (callback, limit) {
    SensorData.find(callback).limit(limit);
}
