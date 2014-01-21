'use strict';

var mongoose = require('mongoose'),
  nconf = require('nconf');

module.exports = mongoose.connect(nconf.get('mongodb'));
