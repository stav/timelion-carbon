'use strict';
angular.

// Declare app level module with dependencies

module('tcCarbon', [
  'ngGrid',
  'ngRoute',
  'tcCarbon.utils',
  'tcCarbon.filters',
  'tcCarbon.services',
  'tcCarbon.directives',
  'tcCarbon.controllers'
]).

// Route configuration

config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/home',                    {templateUrl: 'partials/home.html'});
  $routeProvider.when('/meds',                    {templateUrl: 'partials/meds.html'});
  $routeProvider.when('/xrays',                   {templateUrl: 'partials/xrays.html'});
  $routeProvider.when('/notes',                   {templateUrl: 'partials/notes.html'});
  $routeProvider.when('/video',                   {templateUrl: 'partials/video.html'});
  $routeProvider.when('/stats',                   {templateUrl: 'partials/stats.html'});
  $routeProvider.when('/costs',                   {redirectTo: '/file/costs'});
  $routeProvider.when('/file/:file',              {templateUrl: 'partials/costs.html', controller: 'DataFileController'});
  // $routeProvider.when('/file/:file/files/:files', {templateUrl: 'partials/ngGrid.html', controller: 'DataFileController'});
  $routeProvider.otherwise({templateUrl: 'partials/front.html'});

  // Turn off caching for devel
  $httpProvider.defaults.cache = false;
  if (!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
