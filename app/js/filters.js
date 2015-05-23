'use strict';

angular.

module('myApp.filters', []).

/* Filters */

filter('interpolate', ['version', function( version ) {
  return function( text ) {
    return String( text ).replace(/\%VERSION\%/mg, version);
  };
}]).

filter('rawHtml', ['$sce', function($sce){
  return function( value ) {
    return $sce.trustAsHtml( value );
  };
}]).

filter('xRay', [function(){
  return function( note ) {
    return note.indexOf('a href=') > -1;
  };
}]);
