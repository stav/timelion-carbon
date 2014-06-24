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

  controller('TimeController', function (EventsDataService) {
    var store = this;
    store.events = [];

    EventsDataService.then(function (result) {
      store.events = result.data;
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

  controller('MedController', function (MedsDataService) {
    var store = this;
    store.meds = [];

    MedsDataService.then(function (result) {
      store.meds = result.data;
    });

    this.getMeds = function () {
      var medicine_names = [];

      for (var i = 0; i < store.meds.length; i++) {
        medicine_names.push(store.meds[i].name);
      };

      return medicine_names;
    };
  });

})();
