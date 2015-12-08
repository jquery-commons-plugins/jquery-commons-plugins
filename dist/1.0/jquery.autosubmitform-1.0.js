/**
 * Auto submit when changing value of a test field in a form.
 * Needed : JQuery 2.1.3 or more.
 * Version : 1.O.
 * 
 * @author Idriss Neumann <neumann.idris@gmail.com>
 */
(function ($, undefined) {
	$.fn.autoSubmitform = function() {
		var inputs = "#" + $(this).attr('id') + " :input[type=\"text\"]";
		var idBtn = $(this).attr('id') + "_btnFilter";
		
		$(this).append("<input type='submit' style='display: none' id = '" + idBtn + "' />");
	
		$(inputs).change(function(){
  			$('#' + idBtn).click();
  		});
	};
}( jQuery ));