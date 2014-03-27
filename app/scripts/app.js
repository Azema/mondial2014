'use strict';

angular.module('mondial2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'userService',
  'matchService'
])
  .config(function ($routeProvider) {
    Parse.initialize('hHMtwspyCykR6LuH6dJGQr9VlVPZ0qdp0io9Ju96', 'yP1WZanl5W944habV9NsAQa3AsoJYklVaqiL5JwX');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/bets', {
        templateUrl: 'views/bets.html',
        controller: 'BetsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
