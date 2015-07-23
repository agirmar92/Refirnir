myApp.controller('newEventController', [ '$scope', '$rootScope', '$location', 'mySharedResources', 
	function ($scope, $rootScope, $location, mySharedResources) {
			$scope.newEvent = {	 desc: "",
								 creator: "",
								 dateCreated: "",
								 dateOfEvent: "",
								 dayOfEvent: "TODO",
								 location: "",
								 maxPlayers: 0,
								 signedPlayers: { 0: "" },
								 timeOfEvent: ""  };

			$scope.createEvent = function() {
				$scope.newEvent.creator = $rootScope.user.facebookID;
				$scope.newEvent.dateCreated = (new Date()).toLocaleDateString();
				$scope.newEvent.signedPlayers = { 0: $rootScope.user.facebookID };

				mySharedResources.createEvent($scope.newEvent).then(function(result) {
					$location.path("/boltar");
					console.log(result);
				}, function(reason) {
					console.log(reason);
				});
			};
		}
]);