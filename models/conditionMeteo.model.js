const mongoose = require('mongoose');
const ConditionMeteoSchema = require('./conditionMeteo.schema');

module.exports = mongoose.model('ConditionsMeteo', ConditionMeteoSchema);
