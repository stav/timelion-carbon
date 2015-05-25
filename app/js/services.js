'use strict';

const

    version = '0.3.0',
    days_long = 366,
    start_date = new Date(2014, 4, 31);

angular.

module('myApp.services', ['myApp.utils']).

/* Constants */

constant('version', version).
constant('days_long', days_long).

/* Services */

service('DatesDataService', function ( range ) {
    var dates = [];

    $.each( range(days_long), function( index, value ) {
        var date = new Date(start_date.getTime());
        date.setDate(start_date.getDate() + value);
        dates.push( date );
    });
    this.dates = dates;
}).

service('EventsDataService', function ( $q, $http, DatesDataService, EventsClinicDataService, EventsNotesDataService, EventsMedsDataService ) {
    var self = this,
        events = {},
        _each = angular.forEach;

    this.dates = DatesDataService.dates;
    this.events = [];

    $q.all([
        EventsClinicDataService,
        EventsNotesDataService,
        EventsMedsDataService
    ]).
    then( function ( responses ) {
        self.clinics = responses[0].data;
        self.notes = responses[1].data;
        self.meds = responses[2].data;
    }).
    catch( function ( data ) {
        self.clinics = null;
        self.notes = null;
        self.meds = null;
    }).
    finally( function() {
        // push all dates to events object
        _each( self.dates, function( date ) {
            events[ date ] = {date: date, clinics: ["", ""], notes: "", meds: []};
        });

        // add all clinics to events object
        _each( self.clinics, function( object, index ) {
            _each( object, function( clinics, date_string ) {
                var date = new Date(date_string);
                if ( date in events )
                    events[ date ]['clinics'] = clinics;
                else
                    console.log('Error: ' + date + ' not found for clinics ' + clinics);
            });
        });

        // add all notes to events object
        _each( self.notes, function( object, index ) {
            _each( object, function( notes, date_string ) {
                var date = new Date(date_string);
                if ( date in events )
                    events[ date ]['notes'] = notes;
                // else
                //     console.log('Error: ' + date + ' not found (notes)');
            });
        });

        // add all meds to events object
        _each( self.meds, function( object, index ) {
            _each( object, function( meds, date_string ) {
                var date = new Date(date_string);
                if ( date in events )
                    events[ date ]['meds'] = meds;
                // else
                //     console.log('Error: ' + date + ' not found (meds)');
            });
        });

        // re-order events object into events array
        _each( self.dates, function( date ) {
            if ( date in events )
                self.events.push(events[ date ]);
        });
    }); // finally
}). // EventsDataService

/* Factories */

factory('FileDataService', function ( $http, $routeParams ) {
    var url = 'data/' + $routeParams.file + '.json';
    return $http({ method: 'GET', url: url });
}).

factory('EventsClinicDataService', function ( $http ) {
    return $http({ method: 'GET', url: 'data/events.clinic.json' });
}).

factory('EventsNotesDataService', function ( $http ) {
    return $http({ method: 'GET', url: 'data/events.notes.json' });
}).

factory('EventsMedsDataService', function ( $http ) {
    return $http({ method: 'GET', url: 'data/events.meds.json' });
}).

factory('MedsDataService', function ( $http ) {
    return $http({ method: 'GET', url: 'data/meds.json' });
});
