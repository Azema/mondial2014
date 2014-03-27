'use strict';

angular.module('mondial2014App')
        .controller('MainCtrl', function($scope, UserService) {

            $scope.isLoggedIn = function() {
                return UserService.isLoggedIn();
            };
        });
