'use strict';

angular.

module('myApp.services', []).

/* Services */

value('version', '0.2').

factory('EventsDataService', function ($http) {
    return $http({method: 'GET', url: 'data/events.json'});
}).

factory('MedsDataService', function ($http) {
    return $http({method: 'GET', url: 'data/meds.json'});
});
