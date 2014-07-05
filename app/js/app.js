'use strict';
angular.

// Declare app level module which depends on filters, and services

module('myApp', [
  'ngGrid',
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).

config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/meds', {templateUrl: 'partials/HTML.html'});
  $routeProvider.when('/cost', {templateUrl: 'partials/ngGrid.html', controller: 'CostController'});
  $routeProvider.otherwise({templateUrl: 'partials/front.html'});

  // Turn off caching for devel
  $httpProvider.defaults.cache = false;
  if (!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
