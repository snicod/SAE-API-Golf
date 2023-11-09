const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EtatSolSchema = new Schema({
  date: { type: Date },
  densite_herbe: { type: String },
  qualite_nutriments: { type: String },
  humidite_sol: { type: Number },
  trou_id: { type: Schema.Types.ObjectId, ref: 'Trou' },
});

module.exports = EtatSolSchema;
