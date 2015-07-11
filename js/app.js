var myApp = angular.module('refirnirApp', ['ngRoute']);

myApp.config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider
			.when('/boltar',             { templateUrl: 'views/boltar.html' })
			//.when('/inbox/:user',       { templateUrl: 'inbox.html',   controller: 'inboxController' })
			
			.otherwise({
				redirectTo: '/boltar'
			});
	}
]);

/* Controller */
myApp.controller('appController', [ '$scope', function ($scope) {
		$scope.heading = 'Enginn bolti ';

		$scope.createEvent = function() {
			console.log("Create event clicked");
		}

		$scope.testButton = function() {
			$scope.testArray.size = 0;
			console.log($scope.testArray.size);
		}

		$scope.testArray = ["Ægir", "Nonni", "Kalli"];
	}
]);