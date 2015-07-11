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
myApp.controller('boltarController', [ '$scope', function ($scope) {
		$scope.heading = 'Enginn bolti ';
	}
]);