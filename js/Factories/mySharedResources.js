/* Factories, mun skila mock gögnum til að byrja með */
myApp.factory('mySharedResources', function($firebaseArray, $firebaseObject, $rootScope, $q) {
    var factory = {};

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
        });
    };

    /* returns the user if found, else null */
    factory.getLoggedUser = function(facebookID) {
        return $q(function(resolve, reject) {
            $rootScope.users.$loaded(
                function(users) {
                    resolve(users.$getRecord(facebookID));
                }, function(error) {
                    reject(error);
                }
            );
        });
    };

    factory.getUser = function(facebookID) {
        return $rootScope.users.$getRecord(facebookID);
    };

    factory.updateUser = function() {
        $rootScope.users.$save($rootScope.user).then(function() {
            console.log("user info (picture most likely) updated");
        });
    };

    factory.getEvent = function(index) {
    	// athuga hvort bolti(index) sé í events fylkinu
        return $rootScope.events.$getRecord(index);
    };

    factory.createEvent = function(eventObject) {
        return $q(function(resolve, reject) {
            $rootScope.events.$add(eventObject).then(function(ref) {
                var id = ref.key();
                console.log("added record with id " + id);
                resolve(id);
            }, function(reason){
                reject(reason);
            });
        });
    };

    factory.editEvent = function(eventObject) {
        // TODO
    };

    factory.deleteEvent = function(event) {
        return $q(function(resolve, reject) {
            $rootScope.events.$remove(event).then(function(result) {
                resolve("Successfully deleted event");
            }, function(reason){
                reject(reason);
            });
        });
    };

    factory.postComment = function(event, comment) {
        // TODO: gera message ad firebaseObject og nota $add.
        if (event.messages === undefined) {
            event.messages = [];
        }
        event.messages.push(comment);
        $rootScope.events.$save(event).then(function() {
            console.log("comment added");
        });
    };

    /* EXTRAS */

    factory.signAttendance = function(index) {
    	var theEvent = this.getEvent(index);
        if (theEvent.signedPlayers === undefined) {
            theEvent.signedPlayers = [];
        }
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