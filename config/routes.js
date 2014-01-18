'use strict';

module.exports = function (app, passport, auth) {

  // Index
  var index = require('../server/controllers/index');
  app.get('/', index.render);

  app.get('/api/v1/hello', function(req, res) {
    res.send({
      hello: 'world'
    });
  });

};
