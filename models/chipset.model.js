const mongoose = require('mongoose');
const ChipsetSchema = require('./chipset.schema');

module.exports = mongoose.model('Chipset',ChipsetSchema);
