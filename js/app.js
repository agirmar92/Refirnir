var myApp = angular.module('refirnirApp', ['ngRoute']);

myApp.config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider
			.when('/boltar',             { templateUrl: 'views/boltar.html', controller: 'eventsController' })
			.when('/bolti/:ID',          { templateUrl: 'views/bolti.html',  controller: 'eventController'  })
			
			.otherwise({
				redirectTo: '/boltar'
			});
	}
]);