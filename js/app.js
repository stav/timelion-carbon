/* TimeLion - Carbon
 * AngularJS implementation of a daily log.
 */
(function() {
  var app = angular.module('TimelionApp', []);

  var meds = [];

  app.controller('TimeController', ['$http', function($http) {
    var time = this;
    time.events = [];

    $http.get('js/events.json').success(function(data) {
      time.events = data;
    });
  }]);

  app.controller('EventController', function() {
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
      return '' + Math.abs(dose) + ' ' + meds[med].unit;
    };
  });

  app.controller('MedController', ['$http', function($http) {
    $http.get('js/meds.json').success(function(data) {
      meds = data;
    });

    this.getMeds = function() {
      var medicine_names = [];

      for (var i = 0; i < meds.length; i++) {
        medicine_names.push(meds[i].name);
      };

      return medicine_names;
    };
  }]);

})();
