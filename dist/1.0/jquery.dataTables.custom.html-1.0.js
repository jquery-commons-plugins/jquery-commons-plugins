/**
 * Generate data table from HTML table.
 * Needed : JQuery 2.1.3 or more, datatable 1.10.3.
 * Version : 1.O.
 * 
 * @author Idriss Neumann <neumann.idriss@gmail.com>
 */
(function($, undefined) {
	/**
	 * Testing if a variable exists.
	 * 
	 * @param data
	 */
	function isset(data) {
		return (typeof data !== 'undefined' && data !== null);
	}

	/**
	 * Getting a numeric value of date DD/MM/YYYY.
	 * 
	 * @param date
	 * @returns integer value of date
	 */
	function splitDateYYMMAAA(date) {
		var resDate = date.split(/[\/]/);
		var res = resDate[2] + resDate[1] + resDate[0];
		return res;
	}

	/**
	 * Getting a numeric value of date DD/MM/YYYY HH:mm.
	 * 
	 * @param date
	 * @returns integer value of date
	 */
	function splitDateComplete(date) {
		var resDate = date.split(/[\/\ :]/);
		var res = resDate[2] + resDate[1] + resDate[0] + resDate[3]
				+ resDate[4] + resDate[5];
		return res;
	}

	/**
	 * Compare two dates.
	 */
	function compareDate(a, b) {
		if (a == b) {
			return 0;
		} else if (b > a) {
			return -1;
		} else {
			return 1;
		}
	}

	/**
	 * Custom types.
	 */
	$.fn.dataTableExt.oSort['date-ddmmyyyy-asc'] = function(a, b) {
		a = splitDateYYMMAAA(a);
		b = splitDateYYMMAAA(b);
		return compareDate(a, b);
	};

	$.fn.dataTableExt.oSort['date-ddmmyyyy-desc'] = function(a, b) {
		a = splitDateYYMMAAA(a);
		b = splitDateYYMMAAA(b);
		return compareDate(b, a);
	};

	$.fn.dataTableExt.oSort['date-ddmmyyyy-asc'] = function(a, b) {
		a = splitDateComplete(a);
		b = splitDateComplete(b);
		return compareDate(a, b);
	};

	$.fn.dataTableExt.oSort['date-ddmmyyyy-desc'] = function(a, b) {
		a = splitDateComplete(a);
		b = splitDateComplete(b);
		return compareDate(b, a);
	};

	/**
	 * Compare two number.
	 */
	function compareNumeric(a, b) {
		var a2, b2;

		// If it's a link
		if (/href/.test(a)) {
			a2 = $(a).text();
			b2 = $(b).text();

			a2 = Math.round(a2);
			b2 = Math.round(b2);
		} else {
			a2 = Math.round(a);
			b2 = Math.round(b);
		}

		if (a2 == b2) {
			return 0;
		} else if (a2 > b2) {
			return 1;
		} else {
			return -1;
		}
	}

	$.fn.dataTableExt.oSort['numeric-asc'] = function(a, b) {
		return compareNumeric(a, b);
	};

	$.fn.dataTableExt.oSort['numeric-desc'] = function(a, b) {
		return compareNumeric(b, a);
	};

	/**
	 * Display the select button of colums.
	 * 
	 * @param label
	 */
	$.fn.selectionButton = function() {
		return this.each(function() {
			var idTable = $(this).attr('id');
			var table = $('#' + idTable).DataTable();
			var colvis = new $.fn.dataTable.ColVis(table);
			$(colvis.button()).prependTo('#' + idTable + '_wrapper');
		});
	}

	/**
	 * Order of column.
	 */
	$.fn.orderColumn = function() {
		return this.each(function() {
			var idTable = $(this).attr('id');
			var table = $('#' + idTable).DataTable();
			new $.fn.dataTable.ColReorder(table);
		});
	}

	/**
	 * Display datatable
	 * 
	 * @param colsDef
	 *            definition of columns
	 * @param options
	 *            additionnal options
	 */
	$.fn.customDatatableFromHTML = function(colsDef, options) {
		var idTable = $(this).attr('id');

		if (!(isset(options))) {
			var options = {};
		}

		if (!("iDisplayLength" in options)) {
			options["iDisplayLength"] = 1000;
		}

		if (!("sZeroRecords" in options)) {
			options["sZeroRecords"] = "";
		}

		if (!("sProcessing" in options)) {
			options["sProcessing"] = "";
		}

		if (!("bSort" in options)) {
			options["bSort"] = true;
		}

		if (!("bPaginate" in options)) {
			options["bPaginate"] = true;
		}
		if (!("order" in options)) {
			options["order"] = [ [ 0, "asc" ] ];
		}

		datatable = $('#' + idTable)
				.DataTable(
						{
							"bPaginate" : options['bPaginate'],
							"iDisplayLength" : options['iDisplayLength'],
							"bProcessing" : true,
							"sPaginationType" : "full_numbers",
							"pagingType" : "full_numbers",
							"bDestroy" : true,
							"bFilter" : false,
							"bAutoWidth" : false,
							"bLengthChange" : true,
							"bSort" : options["bSort"],
							"aoColumns" : colsDef,
							"order" : options["order"],
							"sDom" : 'lfrtp',

							// Disable paginate when there is only one page
							"fnDrawCallback" : function(oSettings) {
								if (this.fnSettings().fnRecordsDisplay() <= options['iDisplayLength']) {
									$(oSettings.nTableWrapper).find(
											'.dataTables_paginate').hide();
								} else {
									$(oSettings.nTableWrapper).find(
											'.dataTables_paginate').show();
								}
							},
							"oLanguage" : {
								"sZeroRecords" : options['sZeroRecords'],
								"sInfoEmpty" : "",
								"sInfo" : "",
								"sLengthMenu" : "",
								"sProcessing" : options['sProcessing'],
								"sInfoFiltered" : "",
								"oPaginate" : {
									"sNext" : '&gt;',
									"sLast" : '&gt;&gt;',
									"sFirst" : '&lt;&lt;',
									"sPrevious" : '&lt;'
								}
							}
						});

		$('.pagination .first a', datatable.nTableWrapper).html(
				'<i class="fa fa-angle-double-left"></i>');
		$('.pagination .previous a', datatable.nTableWrapper).html(
				'<i class="fa fa-angle-left"></i>');
		$('.pagination .next a', datatable.nTableWrapper).html(
				'<i class="fa fa-angle-right"></i>');
		$('.pagination .last a', datatable.nTableWrapper).html(
				'<i class="fa fa-angle-double-right"></i>');

		$('#' + idTable + ' tbody').on('click', 'tr', function() {
			$("#" + idTable + " tbody tr").removeClass('highlighted');
			$(this).toggleClass('highlighted');
		});
	}
}(jQuery));