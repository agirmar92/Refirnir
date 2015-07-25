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

			$scope.today = function() {
				$scope.newEvent.dateOfEvent = new Date();
			};
			$scope.today();

			$scope.toggleMin = function() {
				$scope.minDate = $scope.minDate ? null : new Date();
			};
			$scope.toggleMin();

			$scope.createEvent = function() {
				$scope.newEvent.creator = $rootScope.user.facebookID;
				$scope.newEvent.dateCreated = (new Date()).toLocaleDateString();
				$scope.newEvent.dateOfEvent = $scope.newEvent.dateOfEvent.toLocaleDateString();
				$scope.newEvent.signedPlayers = { 0: $rootScope.user.facebookID };
				var dateSplitted = $scope.newEvent.dateOfEvent.split("/");
				$scope.newEvent.dateOfEvent = dateSplitted[1] + "/" + dateSplitted[0] + "/" + dateSplitted[2];
				var weekDay = (new Date(dateSplitted[2], dateSplitted[0]-1, dateSplitted[1])).getDay();
				switch (weekDay) {
					case 0:
						$scope.newEvent.dayOfEvent = "Sunnudagurinn";
						break;
					case 1:
						$scope.newEvent.dayOfEvent = "Mánudagurinn";
						break;
					case 2:
						$scope.newEvent.dayOfEvent = "Þriðjudagurinn";
						break;
					case 3:
						$scope.newEvent.dayOfEvent = "Miðvikudagurinn";
						break;
					case 4:
						$scope.newEvent.dayOfEvent = "Fimmtudagurinn";
						break;
					case 5:
						$scope.newEvent.dayOfEvent = "Föstudagurinn";
						break;
					case 6:
						$scope.newEvent.dayOfEvent = "Laugardagurinn";
						break;
					default:
						$scope.newEvent.dayOfEvent = "Dagurinn";
				}

				mySharedResources.createEvent($scope.newEvent).then(function(result) {
					$location.path("/boltar");
					console.log(result);
				}, function(reason) {
					console.log(reason);
				});
			};
		}
]);