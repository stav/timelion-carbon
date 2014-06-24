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
      return this.evnt.meds;
    };
    this.getMed = function(med) {
      var meds = this.getMeds();
      return meds.length > med ? meds[med] : [];
    };
    this.getClinicVisitors = function(clinic) {
      return this.evnt.clinic[clinic].split('');
    };
    this.atClinic = function(clinic) {
      return this.evnt.clinic[clinic].length > 0;
    };
    this.hasMeds = function(med) {
      var meds = this.getMeds();
      return meds instanceof Array && meds.length > 0;
    };
    this.hasDosage = function(med) {
      return this.getMed(med).length > 0;
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
