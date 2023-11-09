const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GestionnaireTrousSchema = new Schema({
  nom: { type: String },
  prenom: { type: String },
  email: { type: String },
  mot_de_passe: { type: String },
});

module.exports = GestionnaireTrousSchema
