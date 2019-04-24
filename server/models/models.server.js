var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://heroku_sjjqkc63:depge6f9rocj4dta192rc2uoab@ds145786.mlab.com:45786/heroku_sjjqkc63');

module.exports = db;
