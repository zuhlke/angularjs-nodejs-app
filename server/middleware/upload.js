'use strict'

var upload = require('jquery-file-upload-middleware');

module.exports = function (app, logger, nconf) {

  upload.configure({
    uploadDir: nconf.get('uploadDirectory'),
    uploadUrl: '/api/v1/upload'
  });

  upload.on('error', function (e) {
    logger.error(e.message);
  });

  app.use('/api/v1/upload', upload.fileHandler());

};
