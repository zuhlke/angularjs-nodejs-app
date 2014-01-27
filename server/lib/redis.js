'use strict'

var redis = require("redis"),
  nconf = require('nconf');

function db() {

  var config = nconf.get('cookieStore');

  return redis.createClient(config.port, config.host);

}

module.exports = db();