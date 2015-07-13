myApp.controller('eventController', [ '$scope', '$rootScope', '$firebaseObject', '$location', '$routeParams', 'mySharedResources', 'currentUser', 
	function ($scope, $rootScope, $firebaseObject, $location, $routeParams, mySharedResources, currentUser) {
		$scope.currentEvent = {};

		angular.element(document).ready(function () {
        	$scope.currentEvent = mySharedResources.getEvent($routeParams.ID);
        	if (!$rootScope.loggedIn || $scope.currentEvent === null) {
        		$location.path("/boltar");
        	}
    	});
	}
]);