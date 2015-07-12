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