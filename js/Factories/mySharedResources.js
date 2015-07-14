/* Factories, mun skila mock gögnum til að byrja með */
myApp.factory('mySharedResources', function($firebaseArray, $rootScope) {
    var factory = { syncedEvents: {} };

    factory.sync = function() {
        var ref = new Firebase("https://refirnir.firebaseio.com/boltar");
        // download the data into a local object
        $rootScope.events = $firebaseArray(ref);
    }

    /* GETTERS AND SETTERS */

    factory.getUser = function(index) {
    	// TODO
    }

    factory.createUser = function(userObject) {
    	// TODO
    }

    factory.getEvent = function(index) {
    	// athuga hvort bolti(index) sé í events fylkinu
        return $rootScope.events.$getRecord(index);
    }

    factory.createEvent = function(eventObject) {
        // TODO
    }

    factory.editEvent = function(eventObject) {
        // TODO
    }

    factory.deleteEvent = function(index) {
        // TODO
    }

    /*factory.getEvents = function(objectToSync) {
        // for use later!!
        var today = new Date();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var weekDay = today.getDay(); //Sunday is 0!

        return this.syncedEvents;
    }*/

    /* EXTRAS */

    factory.signAttendance = function(index) {
    	var theEvent = this.getEvent(index);
        theEvent.signedPlayers.push($rootScope.user.name);
    }

    factory.unsignAttendance = function(index) {
    	var theEvent = this.getEvent(index);
        var i = theEvent.signedPlayers.indexOf($rootScope.user.name);
        if (i !== -1) {
            theEvent.signedPlayers.splice(i, 1);
        }
    }

    return factory;
});