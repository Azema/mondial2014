'use strict';

angular.module('mondial2014App')
        .controller('HeaderCtrl', ['$scope', 'UserService', '$translate', function($scope, UserService, $translate) {
            $scope.username = '';
            $scope.login = '';
            $scope.password = '';

            $scope.loginAction = function() {
                UserService.login($scope.login, $scope.password).then(
                    function() {
                        var lang = '' + UserService.getCurrentUser().get('lang');
                        var availableLanguages = ['fr', 'en'];
                        lang = (availableLanguages.indexOf(lang) >=0 ) ? lang : 'en';
                        console.log(lang);
                        $translate.use(lang);
                        $scope.$apply();
                    }
                );
            };

            $scope.connectedUser = function() {
                var user = UserService.getCurrentUser();
                if (user) {
                    return user.attributes.username;
                } else {
                    return '';
                }
            };

            $scope.logoutAction = function() {
                UserService.logout();
                $translate.use('en');
            };

            $scope.isLoggedIn = function() {
                return UserService.isLoggedIn();
            };
        }]);