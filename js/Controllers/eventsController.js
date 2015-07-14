myApp.controller('eventsController', [ '$scope', '$rootScope', '$firebaseArray', '$location', '$routeParams', 'mySharedResources', 'currentUser', 
	function ($scope, $rootScope, $firebaseArray, $location, $routeParams, mySharedResources, currentUser) {
		// Búa til nýjan RefaBolta
		$scope.createEventButton = function() {
			// TODO (sama og i appController væntanlega)
			/*var ref = new Firebase('https://refirnir.firebaseio.com/boltar');
			var $rootScope.events = $firebaseArray(ref);*/
			var today = new Date();
			var prufa =			 {	 desc: "Þetta verður rosalegur bolti",
									 creator: "Ægir",
									 dateCreated: today.toLocaleDateString(),
									 dateOfEvent: "07/08/2015",
									 dayOfEvent: "Föstudagurinn",
									 location: "Garðabær",
									 maxPlayers: 22,
									 signedPlayers: { 0: "Siggi Hall" },
									 timeOfEvent: "14:44"  };

			$rootScope.events.$add(prufa).then(function(ref) {
			  var id = ref.key();
			  console.log("added record with id " + id);
			  console.log($rootScope.events);
			  //$rootScope.events.$indexFor(id); // returns location in the array
			});
		}

		// GEYMA: checkBoxClicked(event.ID)

		// Ef ákveðinn bolti er valinn
		$scope.eventClicked = function(index) {
			$location.path("/bolti/" + index);
		}

		$scope.cleanUp = function() {
			$scope.events = [];
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
			if (theEvent.signedPlayers.indexOf(currentUser.userName) !== -1) {
				return "glyphicon-check";
			} else {
				return "glyphicon-unchecked";
			}*/
			return "glyphicon-check";
		}
	}
]);