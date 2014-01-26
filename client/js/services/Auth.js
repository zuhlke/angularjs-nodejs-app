'use strict';

angular.module('myApp.services').factory('Auth', function($cookieStore) {

  var _user = $cookieStore.get('user');

  return {

    setUser: function(user) {
      if (!user.role) {
        user.access_level = ACCESS_LEVELS.pub;
      }

      if (user.role === 'USER') {
        user.access_level = ACCESS_LEVELS.user;
      }

      if (user.role === 'ADMIN') {
        user.access_level = ACCESS_LEVELS.admin;
      }

      _user = user;
      $cookieStore.put('user', _user);
    },

    isAuthorized: function(lvl) {
      return _user.role >= lvl;
    },

    isLoggedIn: function() {
      return _user ? true : false;
    },

    getUser: function() {
      return _user;
    },

    getId: function() {
      return _user ? _user.username : null;
    },

    logout: function() {
      $cookieStore.remove('user');
      _user = null;
    }
  }

});
