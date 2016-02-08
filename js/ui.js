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


function resolveParameters() {
	var status = getStatus();
	var start_date = getStartDate();
	var end_date = getEndDate();
	var service_codes = getServiceCodes();
	
	var parameters = { 
		"status" : status,
		"start_date" : start_date,
		"end_date" : end_date,
		"service_codes" : service_codes
	}
	
	console.log(parameters);
	
	return parameters;
}

function getStatus() {
	var result = "";
	var status = $("#statuspicker").find("option:selected").text().toLowerCase();
	
	if (status !== "kaikki") {
		if (status === "avoin")
			result = "open";
		else
			result = "closed";
	}
	return result;
}

function getStartDate() {
	return $("#datepicker-start").data("DateTimePicker").date().toISOString();
}
function getEndDate() {
	return $("#datepicker-end").data("DateTimePicker").date().toISOString();
}
function getServiceCodes() {
	
	return "";
}



$(document).ready(function() {
		$("#datepicker-start").on("dp.change", function (e) {
            $('#datepicker-end').data("DateTimePicker").minDate(e.date);
        });
        $("#datepicker-end").on("dp.change", function (e) {
            $('#datepicker-start').data("DateTimePicker").maxDate(e.date);
        });
		
		$('#kaikki').val($(this).is(':checked'));

		$('#checkbox1').change(function() {
			if($(this).is(":checked")) {
				var returnVal = confirm("Are you sure?");
				$(this).attr("checked", returnVal);
			}
			$('#textbox1').val($(this).is(':checked'));        
		});		
		
});