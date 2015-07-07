'use strict';

var

    version = '0.3.5',
    days_long = 402,
    start_date = new Date(2014, 4, 31);

angular.

module('tcCarbon.services', ['tcCarbon.utils']).

/* Constants */

constant('version', version).
constant('days_long', days_long).

/* Services */

service('EventsDataService', function ( $q, $http ) {
    var self = this;

    this.events = [];

    $q.all([
        $http.get('data/events.clinic.json'),
        $http.get('data/events.note.json'),
        $http.get('data/events.meds.json')
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
}).

/* Factories */

factory('FileDataService', function ( $http, $routeParams ) {
    var url = 'data/' + $routeParams.file + '.json';
    return $http({ method: 'GET', url: url });
}).

factory('MedsDataService', function ( $http ) {
    return $http.get('data/meds.json');
});

/* Functions */

function events_data_service ( self ) {
    var
        events = new Events(),
        dates = [],
        date_locale = {},
        date_options = { year: 'numeric',
                         month: 'short',
                         day: 'numeric',
                         weekday: 'short'};

    jQuery.each( range( days_long ), function( index, value ) {
        var date = new Date( start_date.getTime());
        date.setDate( start_date.getDate() + value );
        dates.push( date );
    });

    function Events () {
        this.set = function ( name, collection ) {
        /* Spin thru the collections and install each one-at-a-time
         * @name: String - The individual event name of the collection
         * @collection: Array - date/clinic mapping
         */
            jQuery.each( collection, function( i, o ) {
                var date_string = Object.keys( o )[0],
                    value = o[ date_string ],
                    date = new Date( date_string );
                if ( date in events )
                    events[ date ][ name ] = value;
                // else
                //     console.log('Error: ' +
                //         date + ' not found for ' + name);
            });
            return this;
        };
    }

    // push all dates to events object with default values
    angular.forEach( dates, function( date ) {
        events[ date ] = {
            date: date.toLocaleDateString(date_locale, date_options),
            clinic: "",
            notes: "",
            meds: {}
        };
    });

    // update events object with our data
    events.set('clinic', self.clinics)
          .set('notes', self.notes)
          .set('meds', self.meds)
          ;

    // re-order events object as an events array
    jQuery.each( dates, function( index, date ) {
        if ( date in events ) {
            event = events[ date ];
            event.prpday = index - 100;
            event.day = index - 1;
            event.week = Math.floor((event.day - 1) / 7) + 1;
            event.hasMeds = !jQuery.isEmptyObject(event.meds);
            self.events.push( event );
        }
    });
}
