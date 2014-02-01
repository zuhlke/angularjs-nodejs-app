'use strict'

module.exports = function (db, passport, nconf) {

  return {
    auth: require('./AuthenticateController')(passport, db),
    root: require('./RootController')(nconf),
    users: require('./UsersController')(db)
  };

};
