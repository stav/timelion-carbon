'use strict';

angular.

module('myApp.controllers', []).

/* Controllers */

controller('MyCtrl1', ['$scope', function($scope) {}]).

controller('MyCtrl2', ['$scope', function($scope) {}]).

controller('EventController', function (MedsDataService) {
  var self = this;
  self.meds = [];
  self.meds_indexes = [];

  MedsDataService.success(function (data) {
    self.meds = data;
    // Create array of integers of the data indexes, e.g. [1, 2, 3, 4, 5, 6, 7]
    var index = data.length;
    while (index) self.meds_indexes[--index] = index;
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
    // if (!angular.isArray(this.event.meds)) return false;
    // if (!this.event.meds.length) return false;
    for (var i = 0; i < this.event.meds.length; i++) {
      // if (!angular.isArray(this.event.meds[i])) return false;
      if (this.event.meds[i].length > 0) return true;
    };
    return false;
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
    if (med in self.meds)
      return '' + Math.abs(dose) + ' ' + self.meds[med].unit;
  };
}).

controller('tHeadController', function ($scope, MedsDataService) {
  $scope.meds = [];

  MedsDataService.success(function (data) {
    $scope.meds = data; //.splice(0, 1);
  });
}).

controller('tBodyController', function ($scope, EventsDataService) {
  $scope.events = [];

  EventsDataService.success(function (data) {
    $scope.events = data;
  });
});
