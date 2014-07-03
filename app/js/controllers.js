'use strict';

angular.

module('myApp.controllers', []).

/* Controllers */

controller('MyCtrl1', ['$scope', function($scope) {}]).

controller('MyCtrl2', ['$scope', function($scope) {}]).

controller('EventController', function (MedsDataService) {
  var store = this;
  store.values = [];

  MedsDataService.success(function (data) {
    store.values = data;
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

controller('tHeadController', function ($scope, MedsDataService) {
  $scope.values = [];

  MedsDataService.success(function (data) {
    $scope.values = data; //.splice(0, 1);
  });
}).

controller('tBodyController', function ($scope, EventsDataService) {
  $scope.events = [];

  EventsDataService.success(function (data) {
    $scope.events = data;
  });
});
