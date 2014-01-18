'use strict';

exports.render = function(req, res) {
  res.sendfile('public/index.html');
};
