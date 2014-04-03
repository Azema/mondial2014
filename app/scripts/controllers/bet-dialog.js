'use strict';

angular.module('mondial2014App')
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'match', function($scope, $modalInstance, match) {

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
}]);