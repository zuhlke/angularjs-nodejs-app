'use strict';

var redis = require('then-redis'),
  nconf = require('nconf');

module.exports = redis.createClient(nconf.redis);
