const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocalisationBalleSchema = new Schema({
  golfeur_id: { type: Schema.Types.ObjectId, ref: 'Golfeur' },
  latitude: { type: Number },
  longitude: { type: Number },
});

module.exports = LocalisationBalleSchema;
