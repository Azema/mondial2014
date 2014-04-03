'use strict';

/* Services */

angular.module('matchService', [])
        .factory('MatchService', function(/*$resource*/) {

            /**
             * Read all the bets of the connected user
             * 
             * @return promise
             */
            var _getMyBets= function() {
                var Bet = Parse.Object.extend('Bet');
                var query = new Parse.Query(Bet);
                query.equalTo('user', Parse.User.current());
                query.include('match');
                return query.find().then(
                    function(results) {
                        var myBets = [];
                        for(var i = 0; i < results.length; i++) {
                            myBets.push({
                                id: results[i].id,
                                awayScore: results[i].get('awayScore'),
                                homeScore: results[i].get('homeScore'),
                                matchId: results[i].get('match').id,
                                parseObject: results[i]
                            });
                        }
                        return myBets;
                    }
                );
            };

            /**
             * Return the bet saved by the current user for the specified match
             *
             * @return a real bet or an empty bet
             */
            var _findBet = function(allMyBets, match) {
                for (var i=0; i<allMyBets.length; i++) {
                    if (allMyBets[i].matchId === match.id) {
                        return allMyBets[i];
                    }
                }
                var BetObj = Parse.Object.extend("Bet");
                var bet = new BetObj();
                bet.set('user', Parse.User.current());
                bet.set('match', match.parseObject);
                return {
                    parseObject: bet,
                };
            };

            /**
             * Read all the matches with their section
             * 
             * @return promise
             */
            var _getMatchSections = function() {
                var MatchSection = Parse.Object.extend('MatchSection');
                var query = new Parse.Query(MatchSection);
                query.ascending('label');
                query.include('matchs');

                // use the find method to retrieve all public books
                return query.find().then(
                    function(results) {
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
                                    awayScore: parseMatches[j].get('awayScore'),
                                    parseObject: parseMatches[j]
                                });
                            }
                            matchSections.push({
                                label: results[i].get('label'),
                                matchs: matches
                            });
                        }
                        return matchSections;
                    }
                );
            };

            var ParseService = {
                name: 'Parse',

                /**
                 * Read all the matches organized per section with the user bets
                 *
                 * @return match object
                 */
                getBetsPerMatchSection: function() {
                    return _getMyBets().then(
                        function(bets) {
                            return _getMatchSections().then(
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
                                                if (typeof values.homeScore !== 'undefined') {
                                                    this.bet.homeScore = values.homeScore;
                                                }
                                                if (typeof values.awayScore !== 'undefined') {
                                                    this.bet.awayScore = values.awayScore;
                                                }
                                            };
                                            matchSections[group].matchs[match].saveBet = function(bet){
                                                this.setBet(bet);
                                                this.bet.parseObject.set('awayScore', this.bet.awayScore);
                                                this.bet.parseObject.set('homeScore', this.bet.homeScore);
                                                this.bet.parseObject.save();
                                            }
                                        }
                                    }
                                    return matchSections;
                                }
                            );
                        }
                    );
                },

                /**
                 * Read all the match sections
                 *
                 * @return promise
                 */
                getMatchSections: function() {
                    return _getMatchSections();
                },

                /**
                 * Read all the bets emitted by the current user
                 *
                 * @return promise
                 */
                getMyBets: function() {
                    return _getMyBets();
                },

                /**
                 * Return the bet saved by the current user for the specified match
                 *
                 * @return a real bet or an empty bet
                 */
                findBet: function(allMyBets, match) {
                    return _findBet(allMyBets, match);
                }

            };

            return ParseService;

        });





