const mongoose = require('mongoose');
const ImageDrapeauSchema = require('./imageDrapeau.schema');

module.exports = mongoose.model('ImagesDrapeaux', ImageDrapeauSchema);
