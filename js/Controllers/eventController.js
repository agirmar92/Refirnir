myApp.controller('eventController', [ '$scope', '$rootScope', '$location', '$routeParams', 'mySharedResources', 
	function ($scope, $rootScope, $location, $routeParams, mySharedResources) {
		$scope.currentEvent = {};
		$scope.editing = false;

		angular.element(document).ready(function () {
        	$scope.currentEvent = mySharedResources.getEvent($routeParams.ID);
        	if (!$rootScope.loggedIn || $scope.currentEvent === null) {
        		$location.path("/boltar");
        	}
        	$scope.editing = false;
    	});

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