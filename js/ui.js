 function onToggleMenu(){
        $("#wrapper").toggleClass("toggled");
    }
	
$(function () {
	$('#datepicker-start').datepicker({
        format: 'dd.mm.yyyy'
    });
	
});

$(function () {
	$('#datepicker-end').datepicker({
        format: 'dd.mm.yyyy'
    });
	
});