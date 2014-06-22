/*
 * TimeLion - Carbon
 *
 * AngularJS implementation of a daily log.
 *
 * To do: relative dosage sizes for columns
 */
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
    this.adminHome = function(med, batch) {
      return this.getMed(med)[batch] > 0;
    };
    this.adminClinic = function(med, batch) {
      return this.getMed(med)[batch] < 0;
    };
    this.med = function(med, dose) {
      return '' + Math.abs(dose) + ' ' + this._meds[med].unit;
    };
  });

  app.controller('MedController', function() {
    this._meds = meds;

    this.getMeds = function() {
      var medicine_names = [];

      for (var i = 0; i < this._meds.length; i++) {
        medicine_names.push(this._meds[i].name);
      };

      return medicine_names;
    };
  });

  var events = [
    [ '02 June', [ [   0],   [   0     ],   [   0     ],   [   0],   [   0    ],   [  0    ],   [  0    ] ] ],
    [ '03 June', [ [   0],   [   0     ],   [   0     ],   [   0],   [   0    ],   [  0    ],   [  0    ] ] ],
    [ '04 June', [ [   0],   [   0     ],   [   0     ],   [   0],   [   0    ],   [  0    ],   [  0    ] ] ],
    [ '05 June', [ [   0],   [   0     ],   [   0     ],   [   0],   [   0    ],   [  0    ],   [  0    ] ] ],
    [ '06 June', [ [ 200],   [ 200     ],   [ 375, 375],   [ 4.5],   [ 100    ],   [  0    ],   [ 2, 2  ] ] ],
    [ '07 June', [ [ 200],   [   0     ],   [ 375, 375],   [ 4.5],   [ 100    ],   [  0    ],   [ 4     ] ] ],
    [ '08 June', [ [-200],   [   0     ],   [-375,-375],   [-4.5],   [-100    ],   [  0    ],   [  0    ] ] ],
    [ '09 June', [ [-200],   [   0     ],   [-375, 375],   [-4.5],   [-100    ],   [  0    ],   [ 4     ] ] ],
    [ '10 June', [ [ 200],   [   0     ],   [ 375, 375],   [ 4.5],   [ 100    ],   [  0    ],   [ 2, 3  ] ] ],
    [ '11 June', [ [ 200],   [   0     ],   [ 375, 375],   [ 4.5],   [ 100    ],   [  0    ],   [ 3, 2  ] ] ],
    [ '12 June', [ [ 200],   [   0     ],   [ 375, 375],   [ 4.5],   [ 100    ],   [  0    ],   [ 2, 4  ] ] ],
    [ '13 June', [ [ 200],   [   0     ],   [ 375, 375],   [ 4.5],   [ 40, 40 ],   [  0    ],   [ 3, 3  ] ] ],
    [ '14 June', [ [ 200],   [   0     ],   [ 375, 375],   [ 4.5],   [ 60, 40 ],   [  0    ],   [ 4     ] ] ],
    [ '15 June', [ [ 200],   [   0     ],   [ 375, 375],   [ 4.5],   [ 50, 40 ],   [  0    ],   [ 4     ] ] ],
    [ '16 June', [ [ 200],   [ 200     ],   [ 375     ],   [ 4.5],   [ 50, 25 ],   [ 20    ],   [ 3     ] ] ],
    [ '17 June', [ [ 200],   [ 200, 200],   [   0     ],   [ 4.5],   [ 25, 25 ],   [ 20, 20],   [ 4     ] ] ],
    [ '18 June', [ [ 200],   [ 200, 200],   [   0     ],   [ 4.5],   [ 25, 25 ],   [ 20, 20],   [4,2,2  ] ] ],
    [ '19 June', [ [ 200],   [ 200, 200],   [   0     ],   [ 4.5],   [ 25, 25 ],   [ 20, 20],   [4,5    ] ] ],
    [ '20 June', [ [ 200],   [ 200, 200],   [   0     ],   [ 4.5],   [   0    ],   [  0    ],   [4,4,4,2] ] ],
    [ '21 June', [ [ 200],   [ 200, 200],   [   0     ],   [ 4.5],   [   0    ],   [  0    ],   [4,2    ] ] ],
    [ 'end'    , [ [   0],   [   0     ],   [   0     ],   [   0],   [   0    ],   [  0    ],   [  0    ] ] ]
  ]

  var meds = [
    {
      name: 'Omeprazol',
      unit: 'mg'
    },
    {
      name: 'Clindamicina',
      unit: 'mg'
    },
    {
      name: 'Metronidazol',
      unit: 'mg'
    },
    {
      name: 'Enrofloxacina',
      unit: 'ml'
    },
    {
      name: 'Carprofen',
      note: 'Sold as Rimadyl & Carproby',
      unit: 'mg'
    },
    {
      name: 'Tramadol',
      unit: 'mg'
    },
    {
      name: 'Cannabis',
      unit: 'drops'
    },
    {}
  ]
})();
