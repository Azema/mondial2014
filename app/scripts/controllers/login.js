'use strict';

angular.module('mondial2014App')
        .controller('LoginCtrl', function($scope, ParseService) {
            $scope.login = '';
            $scope.password = '';
            //$scope.isLoggedIn = ParseService.isLoggedIn();
            $scope.loginAction = function() {
                ParseService.login(
                        $scope.login,
                        $scope.password,
                        function() {
                            $scope.$apply();
                        }
                );
            };
            $scope.logoutAction = function() {
                ParseService.logout();
                //$scope.isLoggedIn = false;
            };
            $scope.isLoggedIn = function() {
                return ParseService.isLoggedIn();
            };
        });