/**
 * Auto submit when changing value of a test field in a form.
 * Needed : JQuery 2.1.3 or more.
 * Version : 1.2.
 * 
 * @author Idriss Neumann <neumann.idris@gmail.com>
 */
(function ($, undefined) {
	$.fn.autoSubmitform = function() {
		var inputs = "#" + $(this).attr('id') + " :input[type=\"text\"]";
		var inputsCheckbox = "#" + $(this).attr('id') + " :input[type=\"checkbox\"]";
		var selects = ".select_" + $(this).attr('id');
		var idBtn = $(this).attr('id') + "_btnFilter";
		
		$(this).append("<input type='submit' style='display: none' id = '" + idBtn + "' />");
	
		$(inputs).change(function(){
  			$('#' + idBtn).click();
  		});

  		$(selects).change(function(){
            $('#' + idBtn).click();
        });
		
		$(inputsCheckbox).click(function(){
  			$('#' + idBtn).click();
  		});
	};
}( jQuery ));
