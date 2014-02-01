'use strict'

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, db) {

  app.use(passport.initialize());

  app.use(passport.session());

  passport.use(new LocalStrategy(function (username, password, done) {
    db.User.findByUsernameOrEmail(username).then(function(users) {
      if (!users || users.length > 1) {
        return done(user);
      }

      var user = users[0];

      user.passwordMatches(password, function(err, matches) {
        if (err) {
          return done(user);
        }

        if (!matches) {
          return done(user);
        }

        return done(null, user);
      });
    }).then(null, function(err) {
      if (err) {
        return done(err);
      }
    });
  }));

  // Inject the current user into the request
  app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
    }
    next();
  });

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.User.findOne({_id: id}, function (err, user) {
      done(null, user);
    });
  });

  passport.ensureAuthenticated = function (role) {
    return function (req, res, next) {
      if (!req.isAuthenticated()) {
        res.send(401);
        return;
      }

      if (role && req.user.role !== role) {
        res.send(403);
        return;
      }

      next();
    };
  };

  return passport;

};
