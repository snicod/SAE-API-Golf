const mongoose = require('mongoose');
const ModuleSchema = require('./module.schema');

module.exports = mongoose.model('Modules',ModuleSchema);
