'use strict';

angular.module('mondial2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'mondial2014Services'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/bets', {
        templateUrl: 'views/bets.html',
        controller: 'LBetsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
