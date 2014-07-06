'use strict';
angular.
module('myApp.controllers', []).

/* Controllers */

controller('CostController', function ($scope, $templateCache, CostsDataService) {
  $scope.costs = [];
  $scope.total_cost = 0;
  $scope.selected_cost = 0;
  $scope.costGrid = {
    data: 'costs',
    showFooter: true,
    enableColumnResize: true,
    excludeProperties: ['id', '$$hashKey'],
    plugins: [new ngGridFlexibleHeightPlugin()],
    footerTemplate: $templateCache.get('gridFooter'),
    columnDefs: [
      {field:'date', displayName:'Date', cellClass:'lalign'},
      {field:'cost', displayName:'Cost', cellClass:'ralign'},
      {field:'type', displayName:'Type'},
      {field:'desc', displayName:'Description', cellClass:'lalign', minWidth:300, width:'auto'}
    ],
    afterSelectionChange: function (row, event) {
      $scope.selected_cost = 0;
      var items = $scope.costGrid.$gridScope.selectedItems;
      for (var i = 0; i < items.length; i++) {
        $scope.selected_cost += items[i].cost;
      }
    }
  };

  CostsDataService.success(function (data) {
    $scope.costs = data;
    data.forEach(function (transaction) {
      $scope.total_cost += transaction.cost;
    });
  });
}).

controller('MedController', function ($scope, MedsDataService) {
  $scope.meds = [];

  MedsDataService.success(function (data) {
    $scope.meds = data; //.splice(0, 1);
  });
}).

controller('EventsController', function ($scope, EventsDataService) {
  $scope.events = [];

  EventsDataService.success(function (data) {
    $scope.events = data;
  });
}).

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

  this.init = function (index, event) {
    this.day = index - 1;
    this.week = Math.floor((this.day - 1) / 7) + 1;
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
    }
    return false;
  };
  this.hasDosage = function (med) {
    return this.getMed(med).length > 0;
  };
  this.getMedsRange = function (med) {
    return new Array(Math.abs(this.getMed(med)));
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
});
