'use strict';

angular.module('mondial2014App')
        .controller('MainCtrl', function($scope, ParseService) {
            $scope.matchSections = [];
            ParseService.getMatchSections(
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
