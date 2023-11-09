const mongoose = require('mongoose');
const LocalisationBalleSchema = require('./localisationBalle.schema');

module.exports = mongoose.model('LocalisationBalle', LocalisationBalleSchema);
