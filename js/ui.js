function onToggleMenu(){
	$("#wrapper").toggleClass("toggled");
}
	
$(function () {
	$('#datepicker-start').datepicker({
		defaultDate: moment().subtract(1, 'months'),
		locale: "fi",
		format: "dd.mm.yyyy"
	});
	
});

$(function () {
	$('#datepicker-end').datepicker({
		defaultDate: moment(),
		locale: "fi",
		format: "dd.mm.yyyy"
	});
	
	
});


$(document).ready(function() {
	var startDate = moment().subtract(1, 'months');
	$('#datepicker-start').datepicker('setDate', new Date(startDate));
	$('#datepicker-start').datepicker('update');
	
	$('#datepicker-end').datepicker('setDate', new Date);
	$('#datepicker-end').datepicker('update');
});