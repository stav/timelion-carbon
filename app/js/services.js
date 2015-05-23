'use strict';

angular.

module('myApp.services', []).

/* Services */

value('version', '0.2.1').

factory('FileDataService', function ($http, $routeParams) {
    var url = 'data/' + $routeParams.file + '.json';
    return $http({method: 'GET', url: url});
}).

factory('EventsDataService', function ($http) {
    return $http({method: 'GET', url: 'data/events.json'});
}).

factory('MedsDataService', function ($http) {
    return $http({method: 'GET', url: 'data/meds.json'});
});
