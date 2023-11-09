const mongoose = require('mongoose');
const CameraSurveillanceSchema = require('./cameraSurveillance.schema');

module.exports = mongoose.model('CamerasSurveillance', CameraSurveillanceSchema);
