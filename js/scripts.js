$( document ).ready(function() {
    $('#username').mouseover(function() {
    	$('#username').css('width', $('#username').outerWidth());
		$('.theUsernameSpan').hide();
		$('.logoutIcon').show();
	});

	$('#username').mouseleave(function() {
		$('.logoutIcon').hide();
		$('.theUsernameSpan').show();
	});
});