const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ModuleSchema = new Schema({

  name: { type: String, required: true}, // the name of the module, like module 1
  shortName: { type: String }, // shortname, like mod1
  key: {type: String, required: true}, // a unique identifier for the module
  uc: { type: String, required: true}, // the type of µC within
  // chipsets are the different chipset that are hosted within an acquisition module
  chipsets: [{type: Schema.Types.ObjectId, required: true, ref: 'Chipset'}],
},{versionKey: false});

module.exports = ModuleSchema;
