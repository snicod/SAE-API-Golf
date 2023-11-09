const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StatistiqueCoupSchema = new Schema({
  golfeur_id: { type: Schema.Types.ObjectId, ref: 'Golfeur', required: true },
  vitesse: { type: Number },
  trajectoire: { type: Number },
  conseils: { type: String },
});

module.exports = StatistiqueCoupSchema;
