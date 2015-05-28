'use strict';

var

    version = '0.3.2',
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

service('EventsDataService', function ( $q, $http, DatesDataService ) {
    var self = this;

    this.dates = DatesDataService.dates;
    this.events = [];

    $q.all([
        $http({ method: 'GET', url: 'data/events.clinic.json' }),
        $http({ method: 'GET', url: 'data/events.notes.json' }),
        $http({ method: 'GET', url: 'data/events.meds.json' })
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
    finally( function () { events_data_service( self ) } );
}). // EventsDataService

/* Factories */

factory('FileDataService', function ( $http, $routeParams ) {
    var url = 'data/' + $routeParams.file + '.json';
    return $http({ method: 'GET', url: url });
}).

factory('MedsDataService', function ( $http ) {
    return $http({ method: 'GET', url: 'data/meds.json' });
});

/* Functions */

function events_data_service ( self ) {
    var
        events = new Events(),
        date_locale = {},
        date_options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    function Events () {
        this.set = function ( name, collection ) {
            $.each( collection, function( i, o ) {
                var date_string = Object.keys( o )[0],
                    value = o[ date_string ],
                    date = new Date( date_string );
                if ( date in events )
                    events[ date ][ name ] = value;
                // else
                //     console.log('Error: ' +
                //         date + ' not found for ' + name + ': ' + clinics);
            });
            return this;
        };
    }

    // push all dates to events object with default values
    angular.forEach( self.dates, function( date ) {
        events[ date ] = {
            date: date.toLocaleDateString(date_locale, date_options),
            clinics: ["", ""],
            notes: "",
            meds: []
        };
    });

    // update events object with our data
    events.set('clinics', self.clinics)
          .set('notes', self.notes)
          .set('meds', self.meds)
          ;

    // re-order events object into events array
    $.each( self.dates, function( index, date ) {
        if ( date in events ) {
            self.events.push( events[ date ] );
        }
    });
}
