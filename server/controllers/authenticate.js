'use strict'

var passport = require('passport');

module.exports = function (app) {

  app.post('/api/v1/authenticate', function(req,res,next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }
      req.user = user.toObject();
      next();
    })(req,res,next);
  }, function(req, res, next) {
    res.json(req.user);
  });

};