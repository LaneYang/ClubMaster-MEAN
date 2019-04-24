
module.exports = function(app) {
  require("./services/user.service.server.js")(app);
  require("./services/club.service.server.js")(app);
  require("./services/widget.service.server.js")(app);
  var db = require("./models/models.server");
};

