'use strict';

/* Services */

angular.module('userService', [])
        .factory('UserService', function(/*$resource*/) {
            var ParseService = {
                name: 'Parse',
                // Login a user
                login: function(username, password, successCallback, errorCallback) {
                    Parse.User.logIn(username, password, {
                        success: function(user) {
                            if (typeof successCallback !== 'undefined') {
                                successCallback(user);
                            }
                        },
                        error: function(user, error) {
                            if (typeof errorCallback !== 'undefined') {
                                errorCallback(error, user);
                            }
                        }
                    });
                },
                // Logout current user
                logout: function(callback) {
                    Parse.User.logOut();
                    if (typeof callback !== 'undefined') {
                        callback();
                    }
                },
                // get the current user
                getCurrentUser: function() {
                    return Parse.User.current();
                },
                // check if someone is logged in
                isLoggedIn: function() {
                    return (this.getCurrentUser() !== null);
                }
            };

            return ParseService;

        });