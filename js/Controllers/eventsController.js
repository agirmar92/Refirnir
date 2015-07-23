myApp.controller('eventsController', [ '$scope', '$rootScope', '$location', '$routeParams', 'mySharedResources', 
	function ($scope, $rootScope, $location, $routeParams, mySharedResources) {
		// Búa til nýjan RefaBolta
		$scope.createEventButton = function() {
			// TODO (sama og i appController væntanlega)
			$location.path("/nyr-bolti");
		};

		// Ef ákveðinn bolti er valinn
		$scope.eventClicked = function(index) {
			$location.path("/bolti/" + index);
		};

		$scope.checkBoxClicked = function(index) {
			var element = angular.element(document.querySelector('#checkbox-' + index));
			if (element.hasClass("glyphicon-unchecked")) {
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
		};

		$scope.isSigned = function(index) {
			var theEvent = mySharedResources.getEvent(index);
			if (theEvent.signedPlayers !== undefined) {
				if (theEvent.signedPlayers.indexOf($rootScope.user.facebookID) !== -1) {
					return "glyphicon-check";
				} else {
					return "glyphicon-unchecked";
				}
			}
		};
	}
]);