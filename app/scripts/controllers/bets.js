'use strict';

angular.module('mondial2014App')
    .controller('BetsCtrl', function($scope, MatchService) {
        $scope.matchSections = [];
        MatchService.getMatchSections(
                function(result) {
                    console.log(result);
                    $scope.matchSections = result;
                    $scope.$apply();
                },
                function(error) {
                    console.log(error);
                }
        );
    });