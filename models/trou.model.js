const mongoose = require('mongoose');
const TrouSchema = require('./trou.schema');

module.exports = mongoose.model('Trou', TrouSchema);
