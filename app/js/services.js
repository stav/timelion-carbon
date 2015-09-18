'use strict';

var

    version = '0.4.0',
    days_long = 480,
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
        $http.get('data/events.xrays.json'),
        $http.get('data/events.note.json'),
        $http.get('data/events.meds.json')
    ]).
    then( function ( responses ) {
        self.clinics = responses[0].data;
        self.xrays = responses[1].data;
        self.notes = responses[2].data;
        self.meds = responses[3].data;
    }).
    catch( function ( data ) {
        self.clinics = null;
        self.xrays = null;
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
        evnt,
        events = new Events(),
        dates = [],
        date_locale = {},
        date_options = { year: 'numeric',
                         month: 'short',
                         day: 'numeric',
                         weekday: 'short'};
    // fill dates array
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
                if ( date in events ) {
                    if ( angular.isArray( events[ date ][ name ] ) )
                        events[ date ][ name ].push( value );
                    else
                        events[ date ][ name ] = value;
                }
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
            xrays: [],
            notes: "",
            meds: {}
        };
    });

    // update events object with our data
    events.set('clinic', self.clinics)
          .set('xrays', self.xrays)
          .set('notes', self.notes)
          .set('meds', self.meds)
          ;

    // re-order events object as an events array
    jQuery.each( dates, function( index, date ) {
        if ( date in events ) {
            evnt = events[ date ];
            evnt.day = index - 1;
            evnt.week = Math.floor(( evnt.day - 1 ) / 7 ) + 1;
            evnt.hasMeds = !jQuery.isEmptyObject( evnt.meds );
            self.events.push( evnt );
        }
    });
}
