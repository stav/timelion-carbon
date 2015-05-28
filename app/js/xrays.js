'use strict';

/*
* DOM ready init
*/
$(document).ready(function() {
}); // dom ready

var image_map = {
    "Carbon-radiografia-2014.05.31.jpg"                  : "https://www.dropbox.com/s/jzfhxex8ur3c2b6/Carbon-radiografia-2014.05.31.jpg",
    "Carbon-radiografia-2014.06.02_1.jpg"                : "https://www.dropbox.com/s/wqdqdg4zotguofm/Carbon-radiografia-2014.06.02_1.jpg",
    "Carbon-radiografia-2014.06.02_2.jpg"                : "https://www.dropbox.com/s/q70ry57myn7r4uh/Carbon-radiografia-2014.06.02_2.jpg",
    "Carbon-radiografia-2014.06.23.jpg"                  : "https://www.dropbox.com/s/f3f1ny2blrtlz2j/Carbon-radiografia-2014.06.23.jpg",
    "Carbon-radiografia-2014.08.01.jpg"                  : "https://www.dropbox.com/s/9rmgtfglvqrt2wg/Carbon-radiografia-2014.08.01.jpg",
    "Carbon-radiografia-2014.08.20.jpg"                  : "https://www.dropbox.com/s/6rwzwtuc6pevd50/Carbon-radiografia-2014.08.20.jpg",
    "Carbon-radiografia-2014.09.11_after-op.jpg"         : "https://www.dropbox.com/s/nkx8brx6cfc5zgv/Carbon-radiografia-2014.09.11_after-op.jpg",
    "Carbon-radiografia-2014.09.11.jpg"                  : "https://www.dropbox.com/s/vjs3iupk9zdufg2/Carbon-radiografia-2014.09.11.jpg",
    "Carbon-radiografia-2014.10.02.jpg"                  : "https://www.dropbox.com/s/o0qxn2nbj0850m7/Carbon-radiografia-2014.10.02.jpg",
    "Carbon-radiografia-2014.10.11_side.jpg"             : "https://www.dropbox.com/s/6wtjtz9uy6tohr2/Carbon-radiografia-2014.10.11_side.jpg",
    "Carbon-radiografia-2014.10.11.jpg"                  : "https://www.dropbox.com/s/w9py7r67y2dgjtc/Carbon-radiografia-2014.10.11.jpg",
    "Carbon-radiografia-2015.02.02_checkup-united_2.jpg" : "https://www.dropbox.com/s/u0ewme2wyjmc6cr/Carbon-radiografia-2015.02.02_checkup-united_2.jpg",
    "Carbon-radiografia-2015.02.02_checkup-united.jpg"   : "https://www.dropbox.com/s/1nw5dt7w5rafeo6/Carbon-radiografia-2015.02.02_checkup-united.jpg",
    "Carbon-radiografia-2015.04.20_.jpg"                 : "https://www.dropbox.com/s/mwf27m7iqv791n5/Carbon-radiografia-2015.04.20_.jpg",
    "Carbon-radiografia-2015.04.20.jpg"                  : "https://www.dropbox.com/s/ovbfd6fz8zjfjqz/Carbon-radiografia-2015.04.20.jpg",
    "Carbon-radiografia-2015.05.22.jpg"                  : "https://www.dropbox.com/s/vgerarbyfvz7f1q/Carbon-radiografia-2015.05.22.jpg"
};

$(document).on("click", ".xray-images img", function( jqevent ) {

    var filename = this.src.
        replace('http://centerstar.org/carbon-images/xrays/', '');

    $('#xrayModalTitle').text(
        filename.
        replace(/[-_]/g, ' ').
        replace('.jpg', '')
    );

    $('#xrayModalPreview').
        attr('src', this.src).
        attr('width', Math.min(this.naturalWidth, 500)).
        on("click", function() { window.open( image_map[ filename ] )});

    $('#xrayDialog').modal('show');
});
