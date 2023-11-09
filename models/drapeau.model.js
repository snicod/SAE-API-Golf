const mongoose = require('mongoose');
const DrapeauSchema = require('./drapeau.schema');

module.exports = mongoose.model('Drapeaux', DrapeauSchema);
