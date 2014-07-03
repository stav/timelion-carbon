'use strict';

/* jasmine specs for controllers */

describe('controllers', function() {

  beforeEach(function() {
    module('myApp.controllers');
    // mock data
    this.data = [
      {name: "test1", date: "today"},
      {name: "test2", date: "tomorrow"}
    ];
    // mock meds data service
    this.promise = {
     _success: null,
      success: function (x) { this._success = x }
    };
  });

  it('should provide $scope with an array of the service data', inject(function($controller) {
    var scope = {}; // mock scope
    var tHeadCtrl = $controller('tHeadController', { $scope: scope, MedsDataService: this.promise });
    expect(tHeadCtrl).toBeDefined();
    this.promise._success(this.data); // mock the callback
    expect(angular.isArray(scope.values)).toBe(true);
    expect(scope.values.length).toEqual(2);
    expect(angular.isObject(scope.values[0])).toBe(true);
    expect(angular.isDefined(scope.values[0].name)).toBe(true);
    expect(scope.values[0].name).toEqual("test1");
    expect(scope.values[1].date).toEqual("tomorrow");
  }));

  it('should provide $scope with an array of the service data', inject(function($controller) {
    var scope = {}; // mock scope
    var tBodyCtrl = $controller('tBodyController', { $scope: scope, EventsDataService: this.promise });
    expect(tBodyCtrl).toBeDefined();
    this.promise._success(this.data); // mock the callback
    expect(angular.isArray(scope.events)).toBe(true);
    expect(scope.events.length).toEqual(2);
    expect(angular.isObject(scope.events[0])).toBe(true);
    expect(angular.isDefined(scope.events[0].name)).toBe(true);
    expect(scope.events[0].name).toEqual("test1");
    expect(scope.events[1].date).toEqual("tomorrow");
  }));

});
