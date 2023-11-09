const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TrouSchema = new Schema({
  numero: { type: Number },
  gestionnaire_id: { type: Schema.Types.ObjectId, ref: 'GestionnaireTrous' },
  drapeau_id: { type: Schema.Types.ObjectId, ref: 'Drapeaux' },
});

module.exports = TrouSchema;
