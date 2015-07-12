/* Factories, mun skila mock gögnum til að byrja með */
myApp.factory('mySharedResources', function(currentUser) {
    var factory = {};
    factory.events = [];

    factory.loginUser = function(loginObject) {
    	// TODO
    }

    factory.logoutUser = function() {
    	// TODO
    }

    factory.getEvent = function(index) {
    	if (index >= this.events.length) {
    		// out of bounds
    		return null;
    	} else if (index < 0) {
    		// out of bounds
    		return null;
    	}

    	return this.events[index];
    }

    factory.getEvents = function() {
    	this.events = [];

		// for use later!!
    	var today = new Date();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var weekDay = today.getDay(); //Sunday is 0!

		// búa til mock gögn
		for (var i = 0; i < 10; i++) {
			this.events.push({
				ID: i, 
				author: currentUser.userName + " " + i,
				location: "Garðabær",
				dateCreated: "12.07.2015",
				dateOfEvent: "14.07.2015",
				timeOfEvent: "16:30",
				signedPlayers: ['Ægir Már Jónsson', 'Danni', 'Gaui', 'Víkingur', 'Maggi', 'Gulli'],
				maxPlayers: 8
			});
		};

		return this.events;
    }

    factory.signAttendance = function(index) {
    	var theEvent = this.getEvent(index);
        theEvent.signedPlayers.push(currentUser.userName);
    }

    factory.unsignAttendance = function(index) {
    	var theEvent = this.getEvent(index);
        var i = theEvent.signedPlayers.indexOf(currentUser.userName);
        if (i !== -1) {
            theEvent.signedPlayers.splice(i, 1);
        }
    }

    factory.createEvent = function() {
    	// TODO
    }

    return factory;
});