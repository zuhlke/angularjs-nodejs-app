'use strict';

var redis = require('redis'),
  nconf = require('nconf');

module.exports = function (app) {

  var io = require('socket.io').listen(app.listen(nconf.get('port')));

  var RedisStore = require('socket.io/lib/stores/redis');
  var pub = redis.createClient();
  var sub = redis.createClient();
  var store = redis.createClient();

  io.set('store', new RedisStore({
    redisPub: pub,
    redisSub: sub,
    redisClient: store
  }));

  io.enable('browser client minification');
  io.enable('browser client etag');
  io.enable('browser client gzip');
  io.set('log level', 1);

  io.set('transports', ['websocket', 'xhr-polling']);

};