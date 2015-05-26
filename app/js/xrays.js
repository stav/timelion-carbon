'use strict';

  /*
   * DOM ready init
   */
  $(document).ready(function() {
  }); // dom ready

  $(document).on("click", ".table-xrays img", function( jqevent ) {

    $('#xrayModalTitle').text(this.src.replace('http://centerstar.org/carbon-images/xrays/', ''));

    $('#xrayModalPreview').
      attr('src', this.src).
      attr('width', Math.min(this.naturalWidth, 500)).
      on("click", function() { window.open( this.src )});

    $('#xrayDialog').modal('show');
  });
