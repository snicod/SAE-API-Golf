const mongoose = require('mongoose');
const MeasureSchema = require('./measure.schema');

module.exports = mongoose.model('Measure',MeasureSchema);
