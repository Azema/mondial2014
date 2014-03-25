'use strict';

/* Services */

angular.module('mondial2014Services', [])
.factory('ParseService', function($resource){
	// Initialize Parse API and objects.
    Parse.initialize("hHMtwspyCykR6LuH6dJGQr9VlVPZ0qdp0io9Ju96", "yP1WZanl5W944habV9NsAQa3AsoJYklVaqiL5JwX");

    var ParseService = {
    	name: "Parse",

    	// Login a user
    	login: function(username, password, successCallback, errorCallback) {
          Parse.User.logIn(username, password, {
            success: function(user) {
              if (typeof successCallback != 'undefined') {
                successCallback(user);
              }
            },
            error: function(user, error) {
              if (typeof errorCallback != 'undefined') {
                errorCallback(error);
              }
            }
        });
      },

      // Logout current user
      logout : function(callback) {
        Parse.User.logOut();
        if (typeof callback != 'undefined') {
          callback();
        }
      },

      getCurrentUser: function() {
        return Parse.User.current();
      },

      isLoggedIn: function() {
        return (this.getCurrentUser()!=null);
      }

    };

    return ParseService;

});