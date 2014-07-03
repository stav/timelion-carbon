'use strict';

angular.

// Declare app level module which depends on filters, and services

module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).

config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});

  // Turn off caching for devel
  $httpProvider.defaults.cache = false;
  if (!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
