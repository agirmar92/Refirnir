$( document ).ready(function() {
    console.log( "ready!" );

    $('#username').mouseover(function() {
		$('#username').css('width', $('#username').outerWidth());
		$('#username').text('Útskrá?');
	})

	$('#username').mouseleave(function() {
		$('#username').text('Ægir Már Jónsson');
	})
});