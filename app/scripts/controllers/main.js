'use strict';

angular.module('mondial2014App')
        .controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService) {

            $scope.isLoggedIn = function() {
                return UserService.isLoggedIn();
            };
        }]);
