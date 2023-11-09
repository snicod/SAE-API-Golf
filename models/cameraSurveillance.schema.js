const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CameraSurveillanceSchema = new Schema({
  date: { type: Date },
  video_url: { type: String },
  trou_id: { type: Schema.Types.ObjectId, ref: 'Trou' },
});

module.exports = CameraSurveillanceSchema;
