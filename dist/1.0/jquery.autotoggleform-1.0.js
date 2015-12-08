/**
 * Auto toggle form when all value of fields are empty.
 * Needed : JQuery 2.1.3 or more.
 * Version : 1.O.
 * 
 * @author Idriss Neumann <neumann.idriss@gmail.com>
 */
(function ($, undefined) {
	$.fn.autoToggleform = function() {
		var inputs = "#" + $(this).attr('id') + " :input[type=\"text\"]";
		var inputsSelect = "#" + $(this).attr('id') + " select option:selected";
		
		var val = '';
		var needToggle = true;
		$(inputs).each(function() {
			val = $(this).val();
			if ('' != val) {
				needToggle = false;
			}
		});
		
		$(inputsSelect).each(function() {
			val = $(this).val();
			if ('0' != val) {
				needToggle = false;
			}
		});
	
		if (needToggle) {
			$(this).toggle();
		}
	};
}( jQuery ));