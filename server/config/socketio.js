var express = require('express.io'),
  redis = require('redis'),
  RedisStore = express.io.RedisStore,
  nconf = require('nconf');

module.exports = function (app) {

  app = express().http().io();

  var config = nconf.get('socketIoStore');

  app.io.set('store', new express.io.RedisStore({
    redisPub: redis.createClient(config.port, config.host),
    redisSub: redis.createClient(config.port, config.host),
    redisClient: redis.createClient(config.port, config.host)
  }));

};