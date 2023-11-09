const mongoose = require('mongoose');
const EtatSolSchema = require('./etatSol.schema');

module.exports = mongoose.model('EtatSol', EtatSolSchema);
