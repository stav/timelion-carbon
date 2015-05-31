'use strict';
angular.
module('tcCarbon.controllers', []).

/* Controllers */

/* Meds */

controller('MedController', function ($scope, MedsDataService) {
  $scope.meds = [];

  MedsDataService.success(function (data) {
    $scope.meds = data; //.splice(0, 1);
  });
}).

/* Events */

controller('EventsController', function ($scope, EventsDataService) {
  $scope.events = EventsDataService.events;
}).

/* Event */

controller('EventController', function ($scope) {
  $scope.abs = Math.abs

  this.init = function (index, event) {
    this.prpday = index - 100;
    this.day = index - 1;
    this.week = Math.floor((this.day - 1) / 7) + 1;
    this.hasMeds = !$.isEmptyObject(event.meds)
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
