'use strict';

/* jasmine specs for services */

describe('service', function() {

  beforeEach(module('myApp.services'));

  describe('version', function() {

    it('should return current version', inject(function(version) {

      expect(version).toEqual('0.2');
    }));
  });
});
