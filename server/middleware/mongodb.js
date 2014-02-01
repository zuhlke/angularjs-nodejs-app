'use strict';

var mongoose = require('mongoose');

module.exports = function(nconf) {

  mongoose.set('debug', nconf.get('mongooseDebug') || false);

  return mongoose.connect(nconf.get('mongodb'), {
    db: {
      safe: true
    }
  });

};
