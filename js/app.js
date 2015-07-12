var myApp = angular.module('refirnirApp', ['ngRoute']);

myApp.config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider
			.when('/boltar',             { templateUrl: 'views/boltar.html' })
			.when('/bolti/:ID',          { templateUrl: 'views/bolti.html'  })
			
			.otherwise({
				redirectTo: '/boltar'
			});
	}
]);

/* Constants */
myApp.service('currentUser',
	function() {
		// TODO: eftir ad sorta ut hvad hver user hefur
		this.token = '';
		this.userName = 'Ægir Már Jónsson';
		this.fullName = '';
		this.role = '';
		this.ssn = '';
		this.imageURL = '';
		return this;
	}
);

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
				signedPlayers: 6,
				maxPlayers: 8
			});
		};

		return this.events;
    }

    factory.signAttendance = function(index) {
    	// TODO
    }

    factory.unsignAttendance = function(index) {
    	// TODO
    }

    factory.createEvent = function() {
    	// TODO
    }

    return factory;
});

/* Controllers */
myApp.controller('appController', [ '$scope', '$location', '$routeParams', 'mySharedResources', 'currentUser', 
	function ($scope, $location, $routeParams, mySharedResources, currentUser) {
		$scope.userName = currentUser.userName;

		$scope.eventsButton = function() {
			$location.path("/boltar");
		}

		$scope.createEventButton = function() {
			// TODO
		}

		$scope.logoutButton = function() {
			// TODO
		}
	}
]);

myApp.controller('eventsController', [ '$scope', '$location', '$routeParams', 'mySharedResources', function ($scope, $location, $routeParams, mySharedResources) {
		$scope.events = [];

		angular.element(document).ready(function () {
        	$scope.events = mySharedResources.getEvents();
    	});

		// Búa til nýjan RefaBolta
		$scope.createEventButton = function() {
			// TODO (sama og i appController væntanlega)
		}

		// Ef ákveðinn bolti er valinn
		$scope.eventClicked = function(index) {
			$location.path("/bolti/" + index);
		}

		$scope.checkOver = function(index) {
			angular.element(document.querySelector('#checkbox-' + index)).removeClass('glyphicon-unchecked');
			angular.element(document.querySelector('#checkbox-' + index)).addClass('glyphicon-check');
		}

		$scope.checkLeave = function(index) {
			angular.element(document.querySelector('#checkbox-' + index)).removeClass('glyphicon-check');
			angular.element(document.querySelector('#checkbox-' + index)).addClass('glyphicon-unchecked');
		}
	}
]);

myApp.controller('eventController', [ '$scope', '$location', '$routeParams', 'mySharedResources', 'currentUser', 
	function ($scope, $location, $routeParams, mySharedResources, currentUser) {
		$scope.currentEvent = {};

		angular.element(document).ready(function () {
        	$scope.currentEvent = mySharedResources.getEvent($routeParams.ID);
        	if ($scope.currentEvent === null) {
        		// birta error
        	}
    	});
	}
]);