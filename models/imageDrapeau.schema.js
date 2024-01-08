const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ImageDrapeauSchema = new Schema({
  distance_estimee: { type: Number },
});

module.exports = ImageDrapeauSchema;
