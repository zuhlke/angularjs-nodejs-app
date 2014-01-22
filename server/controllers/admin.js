'use strict'

module.exports = function (app) {

  app.get('/api/v1/admin', function (req, res, next) {

    console.log(req.user);

  });
};

