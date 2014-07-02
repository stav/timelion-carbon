'use strict';

angular.

module('myApp.directives', []).

/* Directives */

directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]).

directive('bsPopover', function () {
  return function ($scope, element, attrs) {
    jQuery("[data-toggle='popover']").popover();
    jQuery("[data-toggle='tooltip']").tooltip();
  };
});
