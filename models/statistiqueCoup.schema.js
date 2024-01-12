const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StatistiqueCoupSchema = new Schema({
  golfeur_id: { type: Schema.Types.ObjectId, ref: 'Golfeur', required: true },
  trou_id: { type: Schema.Types.ObjectId, ref: 'Trou', required: true },
  date: { type: Date },
  vitesse: { type: Number },
  trajectoire: { type: Number },
  conseils: { type: String },
  latitude_depart: { type: Number },
  longitude_depart: { type: Number },
  latitude_arrivee: { type: Number },
  longitude_arrivee: { type: Number },
  acceleration_x: { type: Number },
  acceleration_y: { type: Number },
});

module.exports = StatistiqueCoupSchema;
