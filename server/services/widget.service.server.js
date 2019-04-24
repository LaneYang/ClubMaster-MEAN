module.exports = function (app) {
  var widgetModel = require("../models/widget/widget.model.server");
  var clubModel = require("../models/club/club.model.server");

  app.post("/api/club/:clubId/widget", createWidget);
  app.get("/api/club/:clubId/widget", findAllWidgetsForClub);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/club/:clubId/widget", reorderWidgets);

  var multer = require('multer'); // npm install multer --save
  var upload = multer({dest: __dirname + '/../../src/assets/uploads'});
  app.post("/api/upload", upload.single('myFile'), uploadImage);

  // var baseUrl = 'http://localhost:3100';
  var baseUrl = 'https://cs5610spring19.herokuapp.com';
  var n = -1;

  function createWidget(req, res) {
    var clubId = req.params["clubId"];
    n = n + 1;
    const widget = {
      type: req.body.type,
      position: n
    };
    widgetModel.createWidget(clubId, widget)
      .then(function (widget) {
        clubModel.findClubById(clubId)
          .then(function (club) {
            club.widgets.push(widget);
            clubModel.updateClub(clubId, club).then();
          });
        res.json(widget);
      });
  }

  function findAllWidgetsForClub(req, res) {
    var clubId = req.params["clubId"];
    var newPos = 0;
    widgetModel.findAllWidgetsForClub(clubId)
      .then(function (widgets) {
        widgets.forEach(function (widget) {
          widget.position = newPos++;
          widgetModel.updateWidget(widget._id, widget).then();
        });
        res.json(widgets);
      });
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      });
  }

  function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    widgetModel.updateWidget(widgetId, widget).then();
    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      });
  }

  function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.deleteWidget(widgetId)
      .then(function (status) {
        res.send(status);
      });
  }

  function uploadImage(req, res) {
    var clubId = req.body.clubId;
    var widgetId = req.body.widgetId;
    var myFile = req.file;

    var callbackUrl = baseUrl + "/founder/clubs/" + clubId + "/widget/";
    // var callbackUrl = "http://localhost:4200/founder/clubs/"+clubId+"/widget";

    if (myFile === null) {
      res.redirect(callbackUrl);
      return;
    }
    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    const widget = {
      url: baseUrl + '/assets/uploads/' + filename
    };

    widgetModel.updateWidget(widgetId, widget).then();
    res.redirect(callbackUrl);
  }

  function reorderWidgets(req, res) {
    var clubId = req.params.clubId;
    var startIndex = parseInt(req.query.initial);
    var endIndex = parseInt(req.query.final);
    widgetModel.reorderWidget(clubId, startIndex, endIndex).then();
    widgetModel.findAllWidgetsForClub(clubId)
      .then(function (widgets) {
        res.json(widgets);
      });
  }

};
