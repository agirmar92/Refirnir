myApp.controller('eventController', [ '$scope', '$rootScope', '$firebaseObject', '$location', '$routeParams', 'mySharedResources', 'currentUser', 
	function ($scope, $rootScope, $firebaseObject, $location, $routeParams, mySharedResources, currentUser) {
		/*$scope.currentEvent = {};

		angular.element(document).ready(function () {
        	$scope.currentEvent = mySharedResources.getEvent($routeParams.ID);
        	if (!$rootScope.loggedIn || $scope.currentEvent === null) {
        		$location.path("/boltar");
        	}
    	});*/

		$scope.events = {}

		var ref = new Firebase("https://refirnir.firebaseio.com/boltar");
		// download the data into a local object
		var syncObject = $firebaseObject(ref);
		// synchronize the object with a three-way data binding
		// click on `index.html` above to see it used in the DOM!
		syncObject.$bindTo($scope, "events");

		// to take an action after the data loads, use the $loaded() promise
		syncObject.$loaded().then(function() {
			console.log("loaded record:", syncObject);
			console.log("loaded record2:", $scope.events);

			/*// To iterate the key/value pairs of the object, use angular.forEach()
			angular.forEach(obj, function(value, key) {
				console.log(key, value);
			});*/
		});
	}
]);