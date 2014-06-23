/* TimeLion - Carbon
 * AngularJS implementation of a daily log.
 */
(function() {
  var app = angular.module('TimelionApp', []);

  app.controller('TimeController', ['$http', function($http) {
    var time = this;
    time.events = [];

    $http.get('js/events.json').success(function(data) {
      time.events = data;
    });
  }]);

  app.controller('EventController', ['$http', function($http) {
    var store = this;
    store.meds = [];

    $http.get('js/meds.json').success(function(data) {
      store.meds = data;
    });

    this.init = function(evnt) {
      this.evnt = evnt;
    };
    this.getMeds = function() {
      return this.evnt[1];
    };
    this.getMed = function(med) {
      return this.getMeds()[med];
    };
    this.hasMeds = function(med) {
      return this.getMed(med) != 0;
    };
    this.getMedsRange = function(med) {
      return Array(Math.abs(this.getMed(med)));
    };
    this.adminHome = function(med, batch) {
      return this.getMed(med)[batch] > 0;
    };
    this.adminClinic = function(med, batch) {
      return this.getMed(med)[batch] < 0;
    };
    this.med = function(med, dose) {
      if (med in store.meds)
        return '' + Math.abs(dose) + ' ' + store.meds[med].unit;
    };
  }]);

  app.controller('MedController', ['$http', function($http) {
    var store = this;
    store.meds = [];

    $http.get('js/meds.json').success(function(data) {
      store.meds = data;
    });

    this.getMeds = function() {
      var medicine_names = [];

      for (var i = 0; i < store.meds.length; i++) {
        medicine_names.push(store.meds[i].name);
      };

      return medicine_names;
    };
  }]);

})();
