'use strict';

angular.

module('myApp.services', []).

/* Services */

value('version', '0.1').

factory('EventsDataService', function ($http) {
    return $http({method: 'GET', url: 'data/events.json'});
}).

factory('MedsDataService', function ($http) {
    return $http({method: 'GET', url: 'data/values.json'});
});
