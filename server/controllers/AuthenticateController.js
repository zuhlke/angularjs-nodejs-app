'use strict'

module.exports = function (passport, db) {

  return {

    register: function(req, res) {
      var user = new db.User(req.body);
      user.username_orig = user.username;
      user.username = user.username.toLowerCase();
      user.setRole('USER').save(function(err, user) {
        if (err) {
          return res.send(400);
        }

        req.login(user, function(err) {
          if (err) {
            return res.send(400);
          }
          res.json(req.user.toObject());
        });
      });
    },

    login: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next({error: 'User does not exist'});
        }

        req.login(user, function(err) {
          if (err) {
            return res.send({error: err.message});
          }
          return res.json(user);
        });

      })(req, res, next);
    },

    postLogin: function(err, req, res, next) {
      return res.send(401, {error: err.message});
    }

  };
};
