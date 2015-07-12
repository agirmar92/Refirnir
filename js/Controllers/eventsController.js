myApp.controller('eventsController', [ '$scope', '$location', '$routeParams', 'mySharedResources', 'currentUser', 
	function ($scope, $location, $routeParams, mySharedResources, currentUser) {
		$scope.events = [];

		angular.element(document).ready(function () {
        	$scope.events = mySharedResources.getEvents();
    	});

		// Búa til nýjan RefaBolta
		$scope.createEventButton = function() {
			// TODO (sama og i appController væntanlega)
		}

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
			var theEvent = mySharedResources.getEvent(index);
			if (theEvent.signedPlayers.indexOf(currentUser.userName) !== -1) {
				return "glyphicon-check";
			} else {
				return "glyphicon-unchecked";
			}
		}
	}
]);