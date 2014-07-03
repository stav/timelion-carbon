'use strict';

angular.

module('myApp.filters', []).

/* Filters */

filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);
