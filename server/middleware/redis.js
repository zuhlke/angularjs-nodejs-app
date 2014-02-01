'use strict'

var redis = require("redis");

module.exports = function (nconf) {

  var config = nconf.get('cookieStore');
  return redis.createClient(config.port, config.host);

};
