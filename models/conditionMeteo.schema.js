const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConditionMeteoSchema = new Schema({
  trou_id: { type: Schema.Types.ObjectId, ref: 'Trou' },
  date: { type: Date },
  temperature: { type: Number },
  humidite: { type: Number },
  vent: {
    vitesse: { type: Number },
    direction: { type: String },
  },
});

module.exports = ConditionMeteoSchema;
