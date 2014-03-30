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
                controller: ModalInstanceCtrl,
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


var ModalInstanceCtrl = function ($scope, $modalInstance, match) {

    $scope.match=match;
    $scope.bet=JSON.parse(JSON.stringify(match.getBet()));

    $scope.ok = function () {
        $scope.bet.homeScore = parseInt('0' + $scope.bet.homeScore, 10);
        $scope.bet.awayScore = parseInt('0' + $scope.bet.awayScore, 10);
        $modalInstance.close({
            match: $scope.match, 
            bet: $scope.bet
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};