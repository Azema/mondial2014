'use strict';

/* Services */

angular.module('mondial2014Services', [])
        .factory('ParseService', function(/*$resource*/) {
            // Initialize Parse API and objects.
            Parse.initialize('hHMtwspyCykR6LuH6dJGQr9VlVPZ0qdp0io9Ju96', 'yP1WZanl5W944habV9NsAQa3AsoJYklVaqiL5JwX');

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
                    return (this.getCurrentUser() != null);
                },

                // read the match sections
                getMatchSections: function(successCallback, errorCallback) {
                    var MatchSection = Parse.Object.extend('MatchSection');
                    var query = new Parse.Query(MatchSection);
                    query.ascending('label');
                    query.include('matchs');

                    // use the find method to retrieve all public books
                    query.find({
                        success: function(results) {
                            var matchSections = [];
                            for(var i = 0; i < results.length; i++) {
                                matchSections.push({
                                    label: results[i].get('label'),
                                    matchs: results[i].get('matchs')
                                });
                            }
                            if (typeof successCallback !== 'undefined') {
                                successCallback(matchSections);
                            }
                        },
                        error: function(error) {
                            if (typeof errorCallback !== 'undefined') {
                                errorCallback(error);
                            }
                        }
                    });
                }

            };

            return ParseService;

        });