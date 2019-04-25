var mongoose = require("mongoose");

var WidgetSchema = mongoose.Schema ({
  _club: {type: mongoose.Schema.Types.ObjectId, ref: "ClubModel"},
  type: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML']} ,
  text: String,
  url: String,
  size: Number,
  position: Number,
  dateCreated: {type: Date, default: Date.now}
}, {collection: "widget" });

module.exports = WidgetSchema;
