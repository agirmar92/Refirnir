myApp.controller('newEventController', [ '$scope', '$rootScope', '$location', 'mySharedResources', 
	function ($scope, $rootScope, $location, mySharedResources) {
			$scope.newEvent = {	 desc: "",
								 creator: "",
								 dateCreated: "",
								 dateOfEvent: "",
								 dayOfEvent: "",
								 location: "",
								 maxPlayers: 0,
								 signedPlayers: { 0: "" },
								 timeOfEvent: ""  };

			//
		}
]);