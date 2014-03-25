'use strict';

/* Services */

angular.module('mondial2014Services', ['ngResource'])
.factory('ParseService', function($resource){
	// Initialize Parse API and objects.
    Parse.initialize("hHMtwspyCykR6LuH6dJGQr9VlVPZ0qdp0io9Ju96", "yP1WZanl5W944habV9NsAQa3AsoJYklVaqiL5JwX");

    var loggedInUser;

    var ParseService = {
    	name: "Parse",

    	// Login a user
    	login: function login(username, password, callback) {
          Parse.User.logIn(username, password, {
            success: function(user) {
            loggedInUser = user;
              callback(user);
            },
            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      },

      // Logout current user
      logout : function logout(callback) {
        Parse.User.logOut();
      },

    };

});