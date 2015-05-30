'use strict';
angular.
module('myApp.controllers', []).

/* Controllers */

/* Meds */

controller('MedController', function ($scope, MedsDataService) {
  $scope.meds = [];

  MedsDataService.success(function (data) {
    $scope.meds = data; //.splice(0, 1);
  });
}).

/* Evemts */

controller('EventsController', function ($scope, EventsDataService) {
  $scope.events = EventsDataService.events;
}).

/* Event */

controller('EventController', function ($scope, MedsDataService) {
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
    event.prpday = index - 100;
    event.day = index - 1;
    event.week = Math.floor((event.day - 1) / 7) + 1;
    // "badge B{{ Math.floor((event.day - 1) / 30 + 1) % 7 }}"
    this.event = event;
  };
  this.getMed = function (med) {
    return this.event.meds.length > med ? this.event.meds[med] : [];
  };
  this.atMiceli = function () {
    return this.event.clinic === "M";
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
}).

/* Date File */
/* /carbon/file/:file
 * API endpoint
 */
controller('DataFileController', function ($scope, $routeParams, $templateCache, FileDataService) {
  $scope.theData = [];
  $scope.name = $routeParams.file;
  $scope.total = 0;
  $scope.total_selected = 0;
  $scope.dataGrid = {
    data: 'theData',
    enableColumnResize: true,
    excludeProperties: ['id', '$$hashKey'],
    multiSelect: true,
    selectWithCheckboxOnly: false,
    showSelectionCheckbox: true,
    showFooter: true,
    footerTemplate: $templateCache.get('gridFooter'),
    plugins: [
      new ngGridFlexibleHeightPlugin()
    ],
    // columnDefs: [
    //   {field:'date', displayName:'Date', cellClass:'lalign'},
    //   {field:'cost', displayName:'Cost', cellClass:'ralign'},
    //   {field:'type', displayName:'Type'},
    //   {field:'desc', displayName:'Description', cellClass:'lalign', minWidth:300, width:'auto'}
    // ],
    afterSelectionChange: function (row, event) {
      $scope.total_selected = 0;
      var items = $scope.dataGrid.$gridScope.selectedItems;
      for (var i = 0; i < items.length; i++) {
        $scope.total_selected += items[i][$scope.total_fieldname];
      }
    }
  };

  FileDataService.success(function ( data, status, headers, config ) {
    // Pop commands of the data
    for (var i = data.length - 1; i >= 0; i--) {

      if (angular.isDefined( data[ i ].timelion )) {

        if (angular.isDefined( data[ i ].timelion.name ))
          $scope.name = data[ i ].timelion.name;

        if (angular.isDefined( data[ i ].timelion.total ))
          $scope.total_fieldname = data[ i ].timelion.total;
      }
      else
        $scope.theData.push( data[ i ]); // data
    }
    // Calc total
    $scope.theData.forEach(function ( transaction ) {
      $scope.total += transaction[ $scope.total_fieldname ];
    });
  });
});
