const mongoose = require('mongoose');
const StatistiqueCoupSchema = require('./statistiqueCoup.schema');

module.exports = mongoose.model('StatistiqueCoup', StatistiqueCoupSchema);
