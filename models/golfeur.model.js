const mongoose = require('mongoose');
const GolfeurSchema = require('./golfeur.schema');

module.exports = mongoose.model('Golfeur', GolfeurSchema);
