'use strict';

var mongoose = require('mongoose'),
  nconf = require('nconf');

function db() {

  mongoose.set('debug', nconf.get('mongooseDebug') || false);

  return mongoose.connect(nconf.get('mongodb'), {
      db: {
        safe: true
      }
  });
}

module.exports = db();
