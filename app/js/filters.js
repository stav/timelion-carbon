'use strict';

angular.

module('tcCarbon.filters', []).

/* Filters */

filter('rawHtml', ['$sce', function( $sce ){
  return function( value ) {
    return $sce.trustAsHtml( value );
  };
}]).

filter('xRay', [function() {
  return function( note ) {
    return note.indexOf('Carbon-radiografia') > -1;
  };
}]);
