myApp.controller('eventsController', [ '$scope', '$rootScope', '$location', '$routeParams', 'mySharedResources', 
	function ($scope, $rootScope, $location, $routeParams, mySharedResources) {
		// Búa til nýjan RefaBolta
		$scope.createEventButton = function() {
			// TODO (sama og i appController væntanlega)
			var today = new Date();
			var prufa =			 {	 desc: "Þetta verður rosalegur bolti",
									 creator: $rootScope.user.name,
									 dateCreated: today.toLocaleDateString(),
									 dateOfEvent: "07/08/2015",
									 dayOfEvent: "Föstudagurinn",
									 location: "Garðabær",
									 maxPlayers: 22,
									 signedPlayers: { 0: "Siggi Hall" },
									 timeOfEvent: "14:44"  };

			mySharedResources.createEvent(prufa);
		}

		// GEYMA: checkBoxClicked(event.ID)

		$scope.deleteEventButton = function(index) {
			mySharedResources.deleteEvent(index);
		}

		// Ef ákveðinn bolti er valinn
		$scope.eventClicked = function(index) {
			$location.path("/bolti/" + index);
		}

		$scope.checkBoxClicked = function(index) {
			var element = angular.element(document.querySelector('#checkbox-' + index));
			console.log("her");
			if ($scope.isSigned(index) === "glyphicon-unchecked") {
				// Skra hann i boltann og haka við
				mySharedResources.signAttendance(index);
				element.removeClass('glyphicon-unchecked');
				element.addClass('glyphicon-check');
			} else {
				// Skra hann úr boltanum og afhaka
				mySharedResources.unsignAttendance(index);
				element.removeClass('glyphicon-check');
				element.addClass('glyphicon-unchecked');
			}
		}

		$scope.isSigned = function(index) {
			/*var theEvent = mySharedResources.getEvent(index);
			if (theEvent.signedPlayers.indexOf($rootScope.user.name) !== -1) {
				return "glyphicon-check";
			} else {
				return "glyphicon-unchecked";
			}*/
			return "glyphicon-check";
		}
	}
]);