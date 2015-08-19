'use strict';

angular.

module('tcCarbon.filters', []).

/* Filters */

filter('rawHtml', ['$sce', function( $sce ){
  return function( value ) {
    return $sce.trustAsHtml( value );
  };
}]).

filter('xRayEvents', [function() {
  // return only events with xrays
  return function( events ) {
    var xray_events = Array();
    angular.forEach( events, function( evnt ) {
        if ( evnt.xrays )
            xray_events.push( evnt );
    });
    return xray_events;
  };
}]);
