'use strict';

angular.

module('myApp.directives', []).

/* Directives */

directive('tcLegend', function() {
    function legend ( scope, element, attrs ) {
        scope.observers  = attrs.$attr.hasOwnProperty('observers'),
        scope.extraNotes = attrs.$attr.hasOwnProperty('extranotes');
    }
    return {
        restrict: 'E',
        link: legend,
        templateUrl: 'partials/legend.html'
    };
}).

directive('tcColLabels', function () {
    return {
        restrict: 'A',
        templateUrl: function ( element, attr ) {
            var type = attr.type || 'default';
            return 'partials/tr-'+ type +'.html'
        }
    };
}).

directive('tcVersion', ['version', function(version) {
    return {
        restrict: 'A',
        template: version
    };
}]).

directive('bsPopover', function () {
  function popover_tooltip () {
    jQuery("[data-toggle='popover']").popover();
    jQuery("[data-toggle='tooltip']").tooltip();
  };
  return {
    link: popover_tooltip
  };
});

/*
Best Practice: Directives should clean up after themselves. You can use
element.on('$destroy', ...) or scope.$on('$destroy', ...) to run a clean-up
function when the directive is removed.

https://docs.angularjs.org/guide/directive

angular.module('docsTimeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
}])
.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

  function link(scope, element, attrs) {
    var format,
        timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }

    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
  }

  return {
    link: link
  };
}]);

angular.module('docsIsoFnBindExample', [])
.controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.name = 'Tobias';
  $scope.message = '';
  $scope.hideDialog = function (message) {
    $scope.message = message;
    $scope.dialogIsHidden = true;
    $timeout(function () {
      $scope.message = '';
      $scope.dialogIsHidden = false;
    }, 2000);
  };
}])
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'close': '&onClose'
    },
    templateUrl: 'my-dialog-close.html'
  };
});
*/
