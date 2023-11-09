const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GolfeurSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String },
  mot_de_passe: { type: String },
});

module.exports = GolfeurSchema;
