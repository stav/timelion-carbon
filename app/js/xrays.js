'use strict';

  /*
   * DOM ready init
   */
  $(document).ready(function() {
  }); // dom ready

  $(document).on("click", ".table-xrays img", function( jqevent ) {
    $('#imagepreview').attr('src', this.src);
    $('#imagepreview').
      attr('width', Math.min(this.naturalWidth, 555)).
      on("click", function() { window.open( this.src )});
    $('#imagemodal').modal('show');
  });
