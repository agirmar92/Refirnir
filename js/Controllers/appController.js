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