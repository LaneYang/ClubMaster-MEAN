module.exports = function(app) {
  app.post("/api/user/:userId/club", createClub);
  app.get("/api/club/:clubId", findClubById);
  app.put("/api/club/:clubId", updateClub);
  app.delete("/api/club/:clubId", deleteClub);
  app.get("/api/clubname/:clubName", findClubByName);
  app.get("/api/topclubs", topClubs);

  var clubModel = require("../models/club/club.model.server");

  function createClub(req, res) {
    var userId = req.params.userId;
    var club = req.body;
    clubModel.createClubForProf(userId, club).then(
      function (club) {
        if (club) {
          res.json(club);
        } else {
          res.sendStatus(400).send("Something went wrong");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findClubById(req, res) {
    var clubId = req.params.clubId;
    clubModel.findClubById(clubId).then(
      function (club) {
        if (club) {
          res.json(club);
        } else {
          res.sendStatus(400).send("Cannot find club with corresponding Id");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findClubByName(req, res) {
    var clubName = req.params.clubName;
    clubModel.findClubByName(clubName).then(
      function (club) {
        res.json(club);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function updateClub(req, res) {
    var clubId = req.params.clubId;
    var updatedClub = req.body;
    clubModel.updateClub(clubId, updatedClub).then(
      function (club) {
        if (club) {
          res.json(club);
        } else {
          res.sendStatus(400).send("Cannot find club with corresponding Id");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function deleteClub(req, res) {
    var clubId = req.params.clubId;
    clubModel.deleteClub(clubId).then(
      function (club) {
        res.json(club);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function topClubs(req, res) {
    clubModel.topClubs().then(
      function (clubs) {
        res.json(clubs);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }


};


