(function() {
  var app = angular.module('TimelionApp', []);

  app.controller('TimeController', function() {
    this.events = events;
  });

  app.controller('EventController', function() {
    this._meds = meds;

    this.init = function(evnt) {
      this.evnt = evnt;
    };
    this.getMeds = function() {
      return this.evnt[1];
    };
    this.getMed = function(med) {
      return this.getMeds()[med];
    };
    this.hasMeds = function(med) {
      return this.getMed(med) != 0;
    };
    this.getMedsRange = function(med) {
      return Array(Math.abs(this.getMed(med)));
    };
    this.med = function(med) {
      return '' + this._meds[med].dose + ' ' + this._meds[med].unit;
    };
  });

  var events = [
    [ '02 June', [ 0,   0,   0,   0,   0,  0 ] ],
    [ '03 June', [ 0,   0,   0,   0,   0,  0 ] ],
    [ '04 June', [ 0,   0,   0,   0,   0,  0 ] ],
    [ '05 June', [ 0,   0,   0,   0,   0,  0 ] ],
    [ '06 June', [ 1,   1,   2,   1,   4,  0 ] ],
    [ '07 June', [ 1,   0,   2,   1,   4,  0 ] ],
    [ '08 June', [-1,   0,  -2,  -1,  -4,  0 ] ],
    [ '09 June', [-1,   0,  -2,  -1,  -4,  0 ] ],
    [ '10 June', [ 1,   0,   2,   1,   4,  0 ] ],
    [ '11 June', [ 1,   0,   2,   1,   4,  0 ] ],
    [ '12 June', [ 1,   0,   2,   1,   4,  0 ] ],
    [ '13 June', [ 1,   0,   2,   1,   4,  0 ] ],
    [ '14 June', [ 1,   0,   2,   1,   4,  0 ] ],
    [ '15 June', [ 1,   0,   2,   1,   4,  0 ] ],
    [ '16 June', [ 1,   1,   1,   1,   1,  1 ] ],
    [ '17 June', [ 1,   2,   0,   1,   2,  2 ] ],
    [ '18 June', [ 1,   2,   0,   1,   2,  2 ] ],
    [ '19 June', [ 1,   2,   0,   1,   2,  2 ] ],
    [ '20 June', [ 1,   2,   0,   1,   2,  2 ] ],
    [ 'end'    , [ 0,   0,   0,   0,   0,  0 ] ]
  ]

  var meds = [
    {
      name: 'Omeprazol',
      dose: 200,
      unit: 'mg'
    },
    {
      name: 'Clindamicina',
      dose: 200,
      unit: 'mg'
    },
    {
      name: 'Metronidazol',
      dose: 375,
      unit: 'mg'
    },
    {
      name: 'Enrofloxacina',
      dose: 4.5,
      unit: 'ml'
    },
    {
      name: 'Rimadyl',
      dose: 25,
      unit: 'mg'
    },
    {
      name: 'Tramadol',
      dose: 20,
      unit: 'mg'
    },
    {}
  ]
})();
