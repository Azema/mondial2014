'use strict';

angular.module('mondial2014App')
        .controller('MainCtrl', ['$scope', 'UserService', '$translate', function($scope, UserService, $translate) {

            $scope.init = function() {
	            $scope.registerFormSwitch=false;
	            $scope.lastError='';
	            $scope.registerLogin='';
	            $scope.registerEmail='';
	            $scope.registerPassword1='';
	            $scope.registerPassword2='';
	            $scope.onRegister=false;
	            $scope.languages=[
		            {code:'en', country:'English' },
		            {code:'fr', country:'Français' }
	            ];
	            $scope.language=$scope.languages[0];
            };

            $scope.init();

            $scope.isLoggedIn = function() {
                return UserService.isLoggedIn();
            };

            $scope.toggleRegister=function() {
                $scope.registerFormSwitch = true;
            };

            $scope.lengthPassword = function() {
                return ($scope.registerPassword1.length>5);
            };

            $scope.checkLogin = function() {
                return ($scope.registerLogin.length>5);
            };

            $scope.checkEmail = function() {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               return re.test($scope.registerEmail);
            };

            $scope.equalPassword = function() {
                return ($scope.registerPassword1 === $scope.registerPassword2);
            };

            $scope.canRegister = function() {
                return ((!$scope.onRegister) && ($scope.equalPassword()) && ($scope.lengthPassword()) && ($scope.checkLogin()));
            };

            $scope.register = function() {
                $scope.onRegister = true;
                $scope.lastError='';
                UserService.userNew($scope.registerLogin, $scope.registerPassword1, $scope.registerEmail, $scope.language.code).then(
                    function() {
                        UserService.login($scope.registerLogin, $scope.registerPassword1).then(
                            function() {
                                var lang = '' + UserService.getCurrentUser().get('lang');
                                var availableLanguages = ['fr', 'en'];
                                lang = (availableLanguages.indexOf(lang) >=0 ) ? lang : 'en';
                                $translate.use(lang);
                                $scope.init();
                                $scope.$apply();
                            }
                        );
                    },
                    function(error){
                        $scope.onRegister = false;
                        $scope.lastError=error.message;
                        $scope.$apply();
                    }
				);
            };
        }]);
