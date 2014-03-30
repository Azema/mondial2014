'use strict';

/* Services */

angular.module('matchService', [])
        .factory('MatchService', function(/*$resource*/) {
            var ParseService = {
                name: 'Parse',

                getBetsPerMatchSection: function(successCallback, errorCallback) {
                    return _getMyBets(
                        function(bets) {
                            _getMatchSections(
                                function(matchSections) {
                                    for (var group=0; group<matchSections.length; group++) {
                                        for (var match=0; match<matchSections[group].matchs.length; match++) {
                                            matchSections[group].matchs[match].bet = _findBet(bets, matchSections[group].matchs[match]);
                                            matchSections[group].matchs[match].getHomeBet = function(){
                                                if (this.bet !== null) {
                                                    return this.bet.homeScore;
                                                }
                                                return '';
                                            };
                                            matchSections[group].matchs[match].getAwayBet = function(){
                                                if (this.bet !== null) {
                                                    return this.bet.awayScore;
                                                }
                                                return '';
                                            };
                                            matchSections[group].matchs[match].getBet = function(){
                                                if (this.bet !== null) {
                                                    return this.bet;
                                                }
                                                return {
                                                    awayScore:'',
                                                    homeScore:''
                                                };
                                            };
                                            matchSections[group].matchs[match].setBet = function(values){
                                                if (this.bet === null) {
                                                    this.bet = {
                                                        awayScore:0,
                                                        homeScore:0
                                                    };
                                                }
                                                if (typeof values.home !== 'undefined') {
                                                    this.bet.homeScore = values.home;
                                                }
                                                if (typeof values.away !== 'undefined') {
                                                    this.bet.awayScore = values.away;
                                                }
                                            };
                                            matchSections[group].matchs[match].saveBet = function(bet){
                                                if (bet === null) {
                                                    return;
                                                }
                                                if (this.bet === null) {
                                                    this.bet = {
                                                        awayScore: bet.awayScore,
                                                        homeScore: bet.homeScore
                                                    };
                                                    console.log('New bet');
                                                } else {
                                                    this.bet.awayScore = bet.awayScore;
                                                    this.bet.homeScore = bet.homeScore;
                                                    console.log('Update bet');
                                                }
                                            }
                                        }
                                    }
                                    if (typeof successCallback !== 'undefined') {
                                        successCallback(matchSections);
                                    }
                                },
                                function(error) {
                                    if (typeof errorCallback !== 'undefined') {
                                        errorCallback(error);
                                    }
                                }
                            );
                        }
                    );
                },

                // read the match sections
                getMatchSections: function(successCallback, errorCallback) {
                    return _getMatchSections(successCallback, errorCallback);
                },

                getMyBets: function(successCallback, errorCallback) {
                    return _getMyBets(successCallback, errorCallback);
                },

                findBet: function(allMyBets, match) {
                    return _findBet(allMyBets, match);
                }

            };

            return ParseService;

        });

var _getMatchSections = function(successCallback, errorCallback) {
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
                        id: parseMatches[j].id,
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
};

var _getMyBets= function(successCallback, errorCallback) {
    var Bet = Parse.Object.extend('Bet');
    var query = new Parse.Query(Bet);
    query.equalTo('user', Parse.User.current());
    query.include('match');
    query.find({
        success: function(results) {
            var myBets = [];
            for(var i = 0; i < results.length; i++) {
                myBets.push({
                    id: results[i].id,
                    awayScore: results[i].get('awayScore'),
                    homeScore: results[i].get('homeScore'),
                    matchId: results[i].get('match').id
                });
            }
            if (typeof successCallback !== 'undefined') {
                successCallback(myBets);
            }
        },
        error: function(error) {
            if (typeof errorCallback !== 'undefined') {
                errorCallback(error);
            }
        }
    });
};

var _findBet = function(allMyBets, match) {
    for (var i=0; i<allMyBets.length; i++) {
        if (allMyBets[i].matchId === match.id) {
            return allMyBets[i];
        }
    }
    return null;
};