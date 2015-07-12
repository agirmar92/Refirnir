var myApp = angular.module('refirnirApp', ['ngRoute', 'facebook', 'firebase']);

myApp.config(['$routeProvider', 'FacebookProvider', 
	function ($routeProvider, FacebookProvider) {
		$routeProvider
			.when('/boltar',             { templateUrl: 'views/boltar.html', controller: 'eventsController' })
			.when('/bolti/:ID',          { templateUrl: 'views/bolti.html',  controller: 'eventController'  })
			
			.otherwise({
				redirectTo: '/boltar'
			});

		var myAppId = '476258182539942';
	    //FacebookProvider.setAppId('myAppId');
     
	    /**
	      * After setting appId you need to initialize the module.
	      * You can pass the appId on the init method as a shortcut too.
	    */
	    FacebookProvider.init(myAppId);
	}
]);