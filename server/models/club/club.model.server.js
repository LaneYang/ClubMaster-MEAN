var mongoose = require('mongoose');
var ClubSchema = require('./club.schema.server');
var ClubModel = mongoose.model('ClubModel', ClubSchema);
var UserModel = require("../user/user.model.server");

ClubModel.createClubForProf = createClubForProf;
ClubModel.findClubById = findClubById;
ClubModel.findClubByName = findClubByName;
ClubModel.updateClub = updateClub;
ClubModel.deleteClub = deleteClub;
ClubModel.topClubs = topClubs;
ClubModel.deleteClubsByProf = deleteClubsByProf;
ClubModel.findClubsByIds = findClubsByIds;

module.exports = ClubModel;

function createClubForProf(userId, club) {
  club._founder = userId;
  return ClubModel.create(club)
    .then(function (responseClub) {
      UserModel.findUserById(userId)
        .then(function (user) {
          user.clubs.push(responseClub._id);
          return user.save();
        });
      return responseClub;
    });
}

function findClubById(clubId) {
  return ClubModel.findById(clubId);
}

function findClubByName(clubName) {
  return ClubModel.findOne({name: clubName});
}

function updateClub(clubId, club) {
  return ClubModel.findByIdAndUpdate(clubId, club);
}

function deleteClub(clubId) {
  return ClubModel.findByIdAndRemove(clubId);
  // return ClubModel.findOne({_id: clubId})
  //   .then(function(club) {
  //     var userId = club._user;
  //     ClubModel.remove({id: clubId})
  //       .then(function() {
  //         return UserModel.deleteClub(userId, clubId);
  //       })
  //   })
}

function topClubs() {
  return ClubModel.find({}).sort({rating: -1}).exec();
}

function deleteClubsByProf(userId) {
  return ClubModel.remove({_founder: userId});
}

function findClubsByIds(clubIds) {
  return ClubModel.find({
    '_id': {$in: clubIds}
  }, function (err, docs) {
  });
}
