'use strict';

angular.module('mondial2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'userService',
  'matchService',
  'ui.bootstrap',
  'pascalprecht.translate'
])
  .config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {
    
    // Parse initialization
    Parse.initialize('hHMtwspyCykR6LuH6dJGQr9VlVPZ0qdp0io9Ju96', 'yP1WZanl5W944habV9NsAQa3AsoJYklVaqiL5JwX');
    
    // routes
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
      
      // Translate
      $translateProvider.useStaticFilesLoader({
        prefix: '/languages/',
        suffix: '.json'
      });

      var currentUser =  Parse.User.current();
      var lang = (currentUser !== null) ? '' + Parse.User.current().get('lang') : 'en';
      var availableLanguages = ['fr', 'en'];
      lang = (availableLanguages.indexOf(lang) >=0 ) ? lang : 'en';
      $translateProvider.preferredLanguage(lang);
  }]);
