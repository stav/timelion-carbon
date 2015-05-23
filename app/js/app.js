'use strict';
angular.

// Declare app level module with dependencies

module('myApp', [
  'ngGrid',
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).

// Route configuration

config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/meds',                    {templateUrl: 'partials/meds.html'});
  $routeProvider.when('/notes',                   {templateUrl: 'partials/notes.html'});
  $routeProvider.when('/costs',                   {redirectTo: '/file/costs'});
  $routeProvider.when('/file/:file',              {templateUrl: 'partials/costs.html', controller: 'DataController'});
  // $routeProvider.when('/file/:file/files/:files', {templateUrl: 'partials/ngGrid.html', controller: 'DataController'});
  $routeProvider.otherwise({templateUrl: 'partials/front.html'});

  // Turn off caching for devel
  $httpProvider.defaults.cache = false;
  if (!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
