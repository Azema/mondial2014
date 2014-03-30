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
                                var parseMatches = results[i].get('matchs');
                                var matches = [];
                                for(var j = 0; j<parseMatches.length; j++) {
                                    matches.push({
                                        date: parseMatches[j].get('date'),
                                        place: parseMatches[j].get('place'),
                                        home: parseMatches[j].get('home'),
                                        away: parseMatches[j].get('away'),
                                        homeCode: parseMatches[j].get('homeCode'),
                                        awayCode: parseMatches[j].get('awayCode'),
                                        homeScore: parseMatches[j].get('homeScore'),
                                        awayScore: parseMatches[j].get('awayScore')
                                    });
                                }
                                matchSections.push({
                                    label: results[i].get('label'),
                                    matchs: matches
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