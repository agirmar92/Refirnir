myApp.controller('newEventController', [ '$scope', '$rootScope', '$location', 'mySharedResources', 
	function ($scope, $rootScope, $location, mySharedResources) {
			$scope.newEvent = {	 desc: "",
								 creator: "",
								 dateOfEvent: "",
								 dayOfEvent: "",
								 location: "",
								 maxPlayers: 8,
								 signedPlayers: { 0: "" },
								 timeOfEvent: ""  };
			$scope.inputTime = "";

			$scope.today = function() {
				$scope.date = new Date();
			};
			$scope.today();

			$scope.toggleMin = function() {
				$scope.minDate = $scope.minDate ? null : new Date();
			};
			$scope.toggleMin();

			$scope.createEvent = function() {
				$scope.newEvent.creator = $rootScope.user.facebookID;
				$scope.date = $scope.date.toLocaleDateString();
				$scope.newEvent.signedPlayers = { 0: $rootScope.user.facebookID };
				var dateSplitted = $scope.date.split("/");
				$scope.newEvent.dateOfEvent = dateSplitted[1] + "/" + dateSplitted[0] + "/" + dateSplitted[2];
				$scope.newEvent.timeOfEvent = $scope.inputTime.getHours() + ":" + $scope.inputTime.getMinutes();
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