/* TimeLion - Carbon
 * AngularJS implementation of a daily log.
 */
(function() {
  angular.

  module('TimelionCarbonApp', []).

  factory('EventsDataService', function ($http) {
    return $http({method: 'GET', url: 'js/events.json'});
  }).

  factory('MedsDataService', function ($http) {
    return $http({method: 'GET', url: 'js/values.json'});
  }).

  controller('tBodyController', function ($scope, EventsDataService) {
    $scope.events = [];

    EventsDataService.success(function (data) {
      $scope.events = data;
    });
  }).

  controller('EventController', function (MedsDataService) {
    var store = this;
    store.values = [];

    MedsDataService.then(function (result) {
      store.values = result.data;
    });

    this.init = function (event) {
      this.event = event;
    };
    this.getMed = function (med) {
      return this.event.values.length > med ? this.event.values[med] : [];
    };
    this.getClinicVisitors = function (clinic) {
      return this.event.clinic[clinic].split('');
    };
    this.atClinic = function (clinic) {
      return this.event.clinic[clinic].length > 0;
    };
    this.hasMeds = function () {
      return this.event.values instanceof Array && this.event.values.length > 0;
    };
    this.hasDosage = function (med) {
      return this.getMed(med).length > 0;
    };
    this.getMedsRange = function (med) {
      return Array(Math.abs(this.getMed(med)));
    };
    this.observed = function (med, batch) {
      return this.getMed(med)[batch] > 0;
    };
    this.unobserved = function (med, batch) {
      return this.getMed(med)[batch] < 0;
    };
    this.med = function (med, dose) {
      if (med in store.values)
        return '' + Math.abs(dose) + ' ' + store.values[med].unit;
    };
  }).

  controller('tHeadController', function ($scope, $http, MedsDataService) {
    $scope.values = [];

    MedsDataService.success(function (data) {
      $scope.values = data; //.splice(0, 1);
    });
  }).

  directive('bsPopover', function () {
    return function ($scope, element, attrs) {
      jQuery("[data-toggle='popover']").popover();
      jQuery("[data-toggle='tooltip']").tooltip();
    };
  });

})();
