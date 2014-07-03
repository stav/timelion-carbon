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
    this.scope = {};
  });

  var test_data = function (data) {
    expect(angular.isArray(data)).toBe(true);
    expect(data.length).toEqual(2);
    expect(angular.isObject(data[0])).toBe(true);
    expect(angular.isDefined(data[0].name)).toBe(true);
    expect(data[0].name).toEqual("test1");
    expect(data[1].date).toEqual("tomorrow");
  }

  it('should provide $scope with an array of the service data', inject(function($controller) {
    var tHeadCtrl = $controller('tHeadController', { $scope: this.scope, MedsDataService: this.promise });
    expect(tHeadCtrl).toBeDefined();
    this.promise._success(this.data); // mock the callback
    test_data(this.scope.values);
  }));

  it('should provide $scope with an array of the service data', inject(function($controller) {
    var tBodyCtrl = $controller('tBodyController', { $scope: this.scope, EventsDataService: this.promise });
    expect(tBodyCtrl).toBeDefined();
    this.promise._success(this.data); // mock the callback
    test_data(this.scope.events);
  }));

  it('should provide an array of the service data', inject(function($controller) {
    var eventCtrl = $controller('EventController', { MedsDataService: this.promise });
    expect(eventCtrl).toBeDefined();
    this.promise._success(this.data); // mock the callback
    test_data(eventCtrl.values);
  }));

  // console.log(this);
});
