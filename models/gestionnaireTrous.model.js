const mongoose = require('mongoose');
const GestionnaireTrousSchema = require('./gestionnaireTrous.schema');

module.exports = mongoose.model('GestionnaireTrous', GestionnaireTrousSchema);
