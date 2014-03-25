'use strict';

angular.module('mondial2014App')
  .controller('LoginCtrl', function ($scope, ParseService) {
  	$scope.login='';
  	$scope.password='';
  	$scope.loginAction = function() {
		ParseService.login($scope.login, $scope.password, function(user) {
	      console.log('Login');
    	});
  	};
  });