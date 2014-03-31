'use strict';

angular.module('mondial2014App')
    .controller('BetsCtrl', function($scope, MatchService, $modal) {
        $scope.matchSections = [];
        $scope.bets = [];
        MatchService.getBetsPerMatchSection(
            function(matchSections) {
                $scope.matchSections = matchSections;
                $scope.$apply();
            },
            function(error) {
                console.log(error);
            }
        );

        $scope.open = function (matchData) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    match: function () {
                      return matchData;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                data.match.saveBet(data.bet);
                
            }, function () {});
        };

    });
