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
    return $http({method: 'GET', url: 'js/meds.json'});
  }).

  controller('TimeController', function ($scope, EventsDataService) {
    $scope.events = [];

    EventsDataService.success(function (data) {
      $scope.events = data;
    });
  }).

  controller('EventController', function (MedsDataService) {
    var store = this;
    store.meds = [];

    MedsDataService.then(function (result) {
      store.meds = result.data;
    });

    this.init = function (event) {
      this.event = event;
    };
    this.getMed = function (med) {
      return this.event.meds.length > med ? this.event.meds[med] : [];
    };
    this.getClinicVisitors = function (clinic) {
      return this.event.clinic[clinic].split('');
    };
    this.atClinic = function (clinic) {
      return this.event.clinic[clinic].length > 0;
    };
    this.hasMeds = function () {
      return this.event.meds instanceof Array && this.event.meds.length > 0;
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
      if (med in store.meds)
        return '' + Math.abs(dose) + ' ' + store.meds[med].unit;
    };
  }).

  controller('MedController', function ($scope, MedsDataService) {
    $scope.medicine_names = [];

    MedsDataService.success(function (data) {
      meds = data;

      for (var i = 0; i < meds.length; i++) {
        $scope.medicine_names.push(meds[i].name);
      };
    });
  });

})();
