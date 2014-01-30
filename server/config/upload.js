'use strict'

var upload = require('jquery-file-upload-middleware'),
  log4js = require('../lib/logger'),
  nconf = require('nconf');

module.exports = function (app) {

  upload.configure({
    uploadDir: nconf.get('uploadDirectory'),
    uploadUrl: '/api/v1/upload'
  });

  upload.on('error', function (e) {
    log4js.error(e.message);
  });

  app.use('/api/v1/upload', upload.fileHandler());

};
