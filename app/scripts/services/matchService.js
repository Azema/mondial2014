'use strict';

/* Services */

angular.module('matchService', [])
        .factory('MatchService', function(/*$resource*/) {
            var ParseService = {
                name: 'Parse',

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