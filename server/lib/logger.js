'use strict'

var log4js = require('log4js'),
  nconf = require('nconf');

function logger() {

  log4js.configure({
    appenders: [{ type: 'console' }, { type: 'file', filename: nconf.get('logFile') }]
  });

  return log4js;

}

module.exports = logger();
