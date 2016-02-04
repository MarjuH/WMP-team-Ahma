function onToggleMenu(){
	$("#wrapper").toggleClass("toggled");
}
	
$(function () {
	
	$('#datepicker-start').datetimepicker({
		defaultDate: moment().subtract(1, 'months'),
		locale: 'fi',
		format: 'L',
		calendarWeeks: true
	});
	
});

$(function () {
	$('#datepicker-end').datetimepicker({
		defaultDate: moment(),
		locale: 'fi',
		format: 'L',
		calendarWeeks: true
	});
	
	
});


$(document).ready(function() {
		$("#datepicker-start").on("dp.change", function (e) {
            $('#datepicker-end').data("DateTimePicker").minDate(e.date);
        });
        $("#datepicker-end").on("dp.change", function (e) {
            $('#datepicker-start').data("DateTimePicker").maxDate(e.date);
        });
});