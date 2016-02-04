var serviceCodes = {
	"0": 	"Valitse",
	"172":	"Ilkivalta",
	"246":	"Roskaaminen",
	"176":	"Töhryjen poisto",
	"171":	"Katujen kunto",
	"198":	"Liikennemerkit",
	"199":	"Kyltit ja opasteet",
	"174":	"Puistot",
	"211":	"Leikki- ja liikuntapuistot",
	"234":	"Metsät",
	"180":	"Muu korjattava asia"
}

function getServiceCodeName(serviceCode) {
	return serviceCodes[serviceCode];
}

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