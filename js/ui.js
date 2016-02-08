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
		"service_code" : service_codes
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
	var result = "";
	var sel = $('input[type=checkbox]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
	
	if (sel.length > 0) {
		for (var i=0; i < sel.length; i++) {
			if (sel[i] !== "1") {
				if (result === "") {
					result = sel[i];
				} 
				else {
					result += "," + sel[i];
				}
			}
		}
	}
	
	console.log(result);
	
	return result;
}

/*
function checkAllBoxes() {
	// See if all the boxes are checked or none of the boxes are checked
	if (($("#ilkivalta").is(":checked") &&
		$("#roskaaminen").is(":checked") &&
		$("#tohryjenpoisto").is(":checked") &&
		$("#katujenkunto").is(":checked") &&
		$("#liikennemerkit").is(":checked") &&
		$("#kyltitjaopasteet").is(":checked") &&
		$("#puistot").is(":checked") &&
		$("#leikkijaliikuntapuistot").is(":checked") &&
		$("#metsat").is(":checked") &&
		$("#muu").is(":checked")) 
		||
		(!$("#ilkivalta").is(":checked") &&
		!$("#roskaaminen").is(":checked") &&
		!$("#tohryjenpoisto").is(":checked") &&
		!$("#katujenkunto").is(":checked") &&
		!$("#liikennemerkit").is(":checked") &&
		!$("#kyltitjaopasteet").is(":checked") &&
		!$("#puistot").is(":checked") &&
		!$("#leikkijaliikuntapuistot").is(":checked") &&
		!$("#metsat").is(":checked") &&
		!$("#muu").is(":checked"))
		) 
	{
		$("#kaikki").prop("checked", true);
	}
}
*/

function selectAllCheckboxes() {
	$('input:checkbox').not(this).prop('checked', this.checked);
}

$(document).ready(function() {
		$("#datepicker-start").on("dp.change", function (e) {
            $('#datepicker-end').data("DateTimePicker").minDate(e.date);
        });
        $("#datepicker-end").on("dp.change", function (e) {
            $('#datepicker-start').data("DateTimePicker").maxDate(e.date);
        });
		
		$("#checkAllBtn").click(function(){
			console.log("checkAllBtn clicked");
			$("input:checkbox").prop('checked', true);
		});
		
		/*
		$("#kaikki").change(function() {
			var isChecked = $(this).is(":checked");
			$("#ilkivalta").prop("checked", isChecked);
			$("#roskaaminen").prop("checked", isChecked);
			$("#tohryjenpoisto").prop("checked", isChecked);
			$("#katujenkunto").prop("checked", isChecked);
			$("#liikennemerkit").prop("checked", isChecked);
			$("#kyltitjaopasteet").prop("checked", isChecked);
			$("#puistot").prop("checked", isChecked);
			$("#leikkijaliikuntapuistot").prop("checked", isChecked);
			$("#metsat").prop("checked", isChecked);
			$("#muu").prop("checked", isChecked);
		});	

		$("#ilkivalta").change(function() 				{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#roskaaminen").change(function() 			{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#tohryjenpoisto").change(function() 			{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#katujenkunto").change(function() 			{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#liikennemerkit").change(function() 			{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#kyltitjaopasteet").change(function() 		{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#puistot").change(function() 				{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#leikkijaliikuntapuistot").change(function() {$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#metsat").change(function() 					{$("#kaikki").prop("checked", false); checkAllBoxes();});
		$("#muu").change(function() 					{$("#kaikki").prop("checked", false); checkAllBoxes();});
		*/
});
