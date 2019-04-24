module.exports = function (app) {
  var userModel = require("../models/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt = require("bcrypt-nodejs");
  var clubModel = require("../models/club/club.model.server");

  app.get('/api/users', findAllUsers);
  app.get('/api/founders', findAllFounders);
  app.get('/api/students', findAllStudents);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.post('/api/loggedin', loggedin);
  app.get("/api/user/:userId", findUserById);

  app.get("/api/user/:userId/club", findClubsByUser);
  app.put("/api/student/:userId/club/:clubId", addClubForStudent);
  app.delete("/api/student/:userId/club/:clubId", deleteClubForStudent);

  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get('/facebook/login', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/student',
    failureRedirect: '/login'
  }));


  // config passport
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        }
      );
  }

  // config local strategy
  passport.use(new LocalStrategy(localStrategy));

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }

  // config facebook strategy
  var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID ? process.env.FACEBOOK_CLIENT_ID : '123',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ? process.env.FACEBOOK_CLIENT_SECRET : '123',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL ?
      process.env.FACEBOOK_CALLBACK_URL : 'http://localhost:4200/auth/facebook/callback'
  };

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id).then(function (user) {
      if (user) {
        return done(null, user);
      } else {
        var names = profile.displayName.split(" ");
        var newFacebookUser = {
          username: names[0],
          password: 'facebook',
          lastName: names[1],
          firstName: names[0],
          email: profile.emails ? profile.emails[0].value : "",
          type: 'STUDENT',
          facebook: {id: profile.id, token: token}
        };
        return userModel.createUser(newFacebookUser);
      }
    }, function (err) {
      if (err) {
        return done(err);
      }
    }).then(function (user) {
      return done(null, user);
    }, function (err) {
      if (err) {
        return done(err);
      }
    });
  }


  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user)
      .then(function (user) {
          if (user) {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
      })
  }

  function findClubsByUser(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId).then(
      function (user) {
        clubModel.findClubsByIds(user.clubs).then(
          function (clubs) {
            res.json(clubs);
          }
        );
      }
    );
  }

  function addClubForStudent(req, res) {
    var userId = req.params["userId"];
    var clubId = req.params["clubId"];
    userModel.findUserById(userId).then(
      function (user) {
        user.clubs.push(clubId);
        userModel.updateUser(userId, user).then();
        res.json(user);
      }
    );
  }

  function deleteClubForStudent(req, res) {
    var userId = req.params["userId"];
    var clubId = req.params["clubId"];
    userModel.findUserById(userId).then(
      function (user) {
        var i;
        for (i = 0; i < user.clubs.length; i++) {
          // HAVE TO USE "==", NOT "==="
          if (user.clubs[i] == clubId) {
            break;
          }
        }
        user.clubs.splice(i, 1);
        userModel.updateUser(userId, user).then();
        res.json(user);
      }
    );
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user).exec();
    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    clubModel.deleteClubsByProf(userId).then();
    userModel.deleteUser(userId)
      .then(function (status) {
        res.send(status);
      });
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }

  function findAllFounders(req, res) {
    userModel.findAllFounders()
      .then(function (founders) {
        res.send(founders);
      });
  }

  function findAllStudents(req, res) {
    userModel.findAllStudents()
      .then(function (students) {
        res.send(students);
      });
  }

};



