/* Factories, mun skila mock gögnum til að byrja með */
myApp.factory('mySharedResources', function($firebaseArray, $firebaseObject, $rootScope, $q) {
    var factory = { databaseRef: null,
                    usersRef: null,
                    eventsRef: null };

    factory.sync = function() {
        this.databaseRef = new Firebase("https://refirnir.firebaseio.com");
        this.usersRef = this.databaseRef.child("users");
        this.eventsRef = this.databaseRef.child("boltar");
        // download the data into a local object
        $rootScope.events = $firebaseArray(this.eventsRef);
        $rootScope.users = $firebaseArray(this.usersRef);
    };

    /* GETTERS AND SETTERS */

    factory.createUser = function(userObject) {
        $rootScope.users.$add(userObject).then(function(ref) {
            var id = ref.key();
            console.log("added user with id " + id);

            $rootScope.user = $rootScope.users.$getRecord(id);
            $rootScope.user.$id = $rootScope.user.facebookID;
            $rootScope.users.$save($rootScope.user).then(function(ref) {
                console.log("saved: ", $rootScope.user);
            });

            //$rootScope.events.$indexFor(id); // returns location in the array
        });
    };

    /* returns true if the user with index is found, else false */
    factory.getUser = function(facebookID) {
        return $rootScope.users.$getRecord(facebookID);
    };

    factory.updateUser = function() {
        $rootScope.users.save($rootScope.user).then(function() {
            console.log("user info (picture most likely) updated");
        });
    };

    factory.getEvent = function(index) {
    	// athuga hvort bolti(index) sé í events fylkinu
        return $rootScope.events.$getRecord(index);
    };

    factory.createEvent = function(eventObject) {
        $rootScope.events.$add(eventObject).then(function(ref) {
          var id = ref.key();
          console.log("added record with id " + id);
          console.log($rootScope.events);
          //$rootScope.events.$indexFor(id); // returns location in the array
        });
    };

    factory.editEvent = function(eventObject) {
        // TODO
    };

    factory.deleteEvent = function(event) {
        return $q(function(resolve, reject) {
            $rootScope.events.$remove(event).then(function(result) {
                resolve("Successfully deleted event");
            }, function(result){
                reject(result);
            });
        });
    };

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
        theEvent.signedPlayers.push($rootScope.user.facebookID);
        $rootScope.events.$save(theEvent).then(function(ref) {
            console.log("signed up!");
        });
    };

    factory.unsignAttendance = function(index) {
        var theEvent = this.getEvent(index);
        var i = theEvent.signedPlayers.indexOf($rootScope.user.facebookID);
        if (i !== -1) {
            theEvent.signedPlayers.splice(i, 1);
            $rootScope.events.$save(theEvent).then(function(ref) {
                console.log("cancelled attendance!");
            });
        }
    };

    return factory;
});