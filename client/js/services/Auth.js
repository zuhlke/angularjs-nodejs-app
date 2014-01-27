'use strict';

angular.module('myApp.services').factory('Auth', function($cookieStore, ACCESS_LEVELS) {

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
      return this.isLoggedIn() && _user.access_level >= lvl;
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

    getUsername: function() {
      return _user ? _user.username_orig : null;
    },

    logout: function() {
      $cookieStore.remove('user');
      _user = null;
    }
  }

});
