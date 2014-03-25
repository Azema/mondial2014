'use strict';

angular.module('mondial2014App')
  .controller('HeaderCtrl',  function ($scope, ParseService) {
  	$scope.username = 'bob';
  	$scope.connectedUser = function() {
  		var user = ParseService.getCurrentUser();
  		if (user) {
  			return user.attributes.username;
  		} else {
  			return '';
  		}
  	};
  	$scope.logoutAction = function() {
  		console.log('logout');
  		ParseService.logout();
  	};
  	$scope.isLoggedIn = function() {
  		return ParseService.isLoggedIn();
  	};
  });