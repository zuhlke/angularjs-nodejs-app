'use strict'

module.exports = function(nconf) {

  return {

    getVersion: function (req, res) {
      res.render('version', { layout: false, version: nconf.get('version') }, function(err, html) {
        res.contentType("text/javascript");
        res.send(html);
      });
    },

    getIndex: function (req, res) {
      res.render('index', { layout: false, title: nconf.get('title'), version: nconf.get('version') });
    }

  };

};
