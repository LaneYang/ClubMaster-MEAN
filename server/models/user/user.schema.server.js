var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
  email: String,
  type: {type: String, enum: ['STUDENT', 'PROFESSOR', 'ADMIN']},
  clubs: [{type: mongoose.Schema.Types.ObjectId, ref: "ClubModel"}],
  dateCreated: {type: Date, default: Date.now},
  facebook: {
    id:    String,
    token: String
  }
}, {collection:'user'});

module.exports = UserSchema;
