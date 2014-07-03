'use strict';

/* jasmine specs for directives */

describe('directives', function() {

  beforeEach(module('myApp.directives'));

  describe('app-version', function() {

    it('should print current version', function() {

      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });

      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });

  describe('bs-popover', function() {

    it('makes sure there are some popovers to popover', function() {
      // console.log('Hello people');
    });
  });

});
