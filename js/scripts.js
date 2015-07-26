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

	Date.prototype.getHoursTwoDigits = function()
	{
	    var retval = this.getHours();
	    if (retval < 10)
	    {
	        return ("0" + retval.toString());
	    }
	    else
	    {
	        return retval.toString();
	    }
	};

	Date.prototype.getMinutesTwoDigits = function()
	{
	    var retval = this.getMinutes();
	    if (retval < 10)
	    {
	        return ("0" + retval.toString());
	    }
	    else
	    {
	        return retval.toString();
	    }
	};
});