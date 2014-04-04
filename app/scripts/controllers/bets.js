'use strict';

angular.module('mondial2014App')
    .controller('BetsCtrl', ['$scope', 'MatchService', '$modal', 'UserService', function($scope, MatchService, $modal, UserService) {
        $scope.matchSections = [];
        $scope.bets = [];
        MatchService.getBetsPerMatchSection().then(
            function(matchSections) {
                $scope.matchSections = matchSections;
                $scope.$apply();
            },
            function(error) {
                console.log(error);
            }
        );

        $scope.open = function (matchData) {
            if (!UserService.isLoggedIn()) {
                return;
            }
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

    }]);
