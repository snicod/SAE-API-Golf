const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ImageDrapeauSchema = new Schema({
  golfeur_id: { type: Schema.Types.ObjectId, ref: 'Golfeur' },
  image_url: { type: String },
  distance_estimee: { type: Number },
});

module.exports = ImageDrapeauSchema;
