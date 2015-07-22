myApp.controller('eventController', [ '$scope', '$rootScope', '$location', '$routeParams', 'mySharedResources', 
	function ($scope, $rootScope, $location, $routeParams, mySharedResources) {
		$scope.currentEvent = {};
		$scope.editing = false;

		angular.element(document).ready(function () {
			if ($routeParams.ID === undefined) {
				$scope.currentEvent = {	 desc: "",
										 creator: $rootScope.user.facebookID,
										 dateCreated: "",
										 dateOfEvent: "",
										 dayOfEvent: "",
										 location: "",
										 maxPlayers: 0,
										 signedPlayers: { 0: $rootScope.user.facebookID },
										 timeOfEvent: ""  };

				//mySharedResources.createEvent(prufa);
				$scope.editing = true;
			} else {
	        	$scope.currentEvent = mySharedResources.getEvent($routeParams.ID);
	        	if (!$rootScope.loggedIn || $scope.currentEvent === null) {
	        		$location.path("/boltar");
	        	}
	        	$scope.editing = false;
			}
    	});

    	$scope.getWeekDay = function() {
    		return "Mánudagurinn";
    	};

    	$scope.getName = function(id) {
    		return mySharedResources.getUser(id).name;
    	};

    	$scope.getPicture = function(id) {
    		return mySharedResources.getUser(id).picture;
    	};

    	$scope.saveEvent = function() {
    		//
    		$scope.editing = false;
    	};

    	$scope.createEvent = function() {
    		var today = new Date();
    		$scope.currentEvent.dateCreated = today.toLocaleDateString();
    		mySharedResources.createEvent($scope.currentEvent);
    		$scope.editing = false;
    	};

    	$scope.deleteEventButton = function() {
    		if(confirm("Ertu viss um að þú viljir eyða þessum fallega bolta?")) {
				mySharedResources.deleteEvent($scope.currentEvent).then(function(result) {
					$location.path("/boltar");
					console.log(result);
				}, function(result) {
					console.log(result);
				});
    		}
		};

		$scope.isCreator = function() {
			return ($scope.currentEvent.creator === $rootScope.user.facebookID);
		};
	}
]);