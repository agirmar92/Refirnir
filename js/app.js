var myApp = angular.module('refirnirApp', ['ngRoute', 'facebook', 'firebase', 'ui.bootstrap', 'ngAnimate', 'leaflet-directive' ]);

myApp.config(['$routeProvider', 'FacebookProvider', 
	function ($routeProvider, FacebookProvider) {
		$routeProvider
			.when('/boltar',             { templateUrl: 'views/boltar.html', 	controller: 'eventsController'  })
			.when('/nyr-bolti',			 { templateUrl: 'views/nyrBolti.html',  controller: 'newEventController'})
			.when('/bolti/:ID',          { templateUrl: 'views/bolti.html', 	controller: 'eventController'   })
			
			.otherwise({
				redirectTo: '/boltar'
			});

		var myAppId = '476258182539942';
     
	    /**
	      * After setting appId you need to initialize the module.
	      * You can pass the appId on the init method as a shortcut too.
	    */
	    FacebookProvider.init(myAppId);
	}
]);

myApp.run(function($rootScope, $firebaseArray, $firebaseObject) {
    var databaseRef = new Firebase("https://refirnir.firebaseio.com");
    var usersRef = databaseRef.child("users");
    var eventsRef = databaseRef.child("boltar");
    // download the data into a local object
    $rootScope.synced = false;
    $rootScope.events = $firebaseArray(eventsRef);
    $rootScope.events.$loaded().then(function() {
        $rootScope.users = $firebaseArray(usersRef);
        $rootScope.users.$loaded().then(function() {
            console.log("Successfully synced");
            $rootScope.synced = true;
        }).catch(function(error) {
            console.log("Error:", error);
        });
        
    }).catch(function(error) {
        console.log("Error:", error);
    });
});