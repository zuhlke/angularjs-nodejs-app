var express = require('express'),
  RedisStore = require('connect-redis')(express);

module.exports = function (app, nconf) {

  app.use(express.session({
    secret: nconf.get('cookieStore').secret,
    store: new RedisStore(nconf.get('cookieStore')),
    cookie: { maxAge: 3600000 }
  }));

};
