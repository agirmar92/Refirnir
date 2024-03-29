myApp.controller('newEventController', [ '$scope', '$rootScope', '$location', 'mySharedResources', '$timeout',
	function ($scope, $rootScope, $location, mySharedResources, $timeout) {
			$scope.newEvent = {	 creator: "",
								 dateOfEvent: "",
								 dayOfEvent: "",
								 location: "",
								 maxPlayers: 8,
								 signedPlayers: { 0: "" },
								 timeOfEvent: ""  };
			$scope.inputTime = "";
			$scope.desc = "";

			$scope.today = function() {
				$scope.date = new Date();
			};
			$scope.today();

			$scope.toggleMin = function() {
				$scope.minDate = $scope.minDate ? null : new Date();
			};
			$scope.toggleMin();

			$scope.createEvent = function() {
				if ($scope.isValid() && $rootScope.loggedIn) {
					$scope.newEvent.creator = $rootScope.user.facebookID;
					$scope.newEvent.signedPlayers = { 0: $rootScope.user.facebookID };
					$scope.newEvent.dateOfEvent = $scope.date.getDate() + "/" + ($scope.date.getMonth()+1) + "/" + $scope.date.getFullYear();
					$scope.newEvent.timeOfEvent = $scope.inputTime.getHoursTwoDigits() + ":" + $scope.inputTime.getMinutesTwoDigits();
					if ($scope.desc !== "") {
						$scope.newEvent.messages = [ { author: $scope.newEvent.creator,
													   text: $scope.desc } ];
					}
					var weekDay = $scope.date.getDay();
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
						$location.path("/bolti/" + result);
					}, function(reason) {
						console.log(reason);
					});
				} else {
					var submitButton = angular.element('.btn.btn-lg.btn-default.takki2');
					var timeBox = angular.element('#timeBox');
					var locationBox = angular.element('#locationBox');
					if (!timeBox.hasClass('ng-valid')) {
						timeBox.addClass('ng-invalid ng-touched');
					}
					if (!locationBox.hasClass('ng-valid')) {
						locationBox.addClass('ng-invalid ng-touched');
					}
					submitButton.addClass('shake animated');
					$timeout(function(){ submitButton.removeClass('shake animated'); }, 1000);
				}

			};

			$scope.isValid = function() {
				return angular.element('.newEvent').hasClass('ng-valid');
			};
		}
]);