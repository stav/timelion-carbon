'use strict';

/* jasmine specs for controllers */

describe('controllers', function() {

  beforeEach(module('myApp.controllers'));

  it('should ....', inject(function($controller) {

    var myCtrl1 = $controller('MyCtrl1', { $scope: {} });
    expect(myCtrl1).toBeDefined();
  }));
});
