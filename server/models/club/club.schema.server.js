var mongoose = require('mongoose');
var WidgetSchema = require("../widget/widget.schema.server");

var ClubSchema = mongoose.Schema({
  _founder: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
  name: String,
  description: String,
  title: String,
  rating: Number,
  sumRating: Number,
  numRating: Number,
  widgets: [WidgetSchema],
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {collection: 'club'});

module.exports = ClubSchema;
