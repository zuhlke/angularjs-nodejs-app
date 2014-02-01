'use strict'

module.exports = function (nconf) {

  return {

    User: require('./User')(nconf)

  };

};
