myApp.controller('appController', [ '$scope', '$rootScope', '$location', '$routeParams', '$firebaseArray', '$timeout', 'mySharedResources', 'currentUser', 'Facebook', 
	function ($scope, $rootScope, $location, $routeParams, $firebaseArray, $timeout, mySharedResources, currentUser, Facebook) {
		$rootScope.userName = '';
		$rootScope.loggedIn = false;
		$rootScope.facebookReady = false;
		$rootScope.user = {};
		$rootScope.events = {};

		// synchronize the object with a three-way data binding
		// click on `index.html` above to see it used in the DOM!

		angular.element(document).ready(function () {
			mySharedResources.sync();
    	});

		$scope.eventsButton = function() {
			$location.path("/boltar");
		}

		$scope.createEventButton = function() {
			// TODO
		}

		$scope.logoutButton = function() {
			// TODO
		}

		$scope.$watch(function() {
		  	// This is for convenience, to notify if Facebook is loaded and ready to go.
		  	return Facebook.isReady();
		}, function(newVal) {
			// You might want to use this to disable/show/hide buttons and else
			$rootScope.facebookReady = true;
		});

		Facebook.getLoginStatus(function(response) {
			if(response.status === 'connected') {
				$rootScope.loggedIn = true;
				$scope.me();
			} else {
				$rootScope.loggedIn = false;
			}
		});

		$scope.login = function() {
			if (!$rootScope.loggedIn) {
				// From now on you can use the Facebook service just as Facebook api says
				Facebook.login(function(response) {
					if (response.status === 'connected') {
						$rootScope.loggedIn = true;
						$scope.me();
					}
				});
			}
	    };

	    $scope.logout = function() {
	    	if (confirm("Ertu viss um að þú viljir útskrá?")) {
				Facebook.logout(function() {
					$scope.$apply(function() {
						$rootScope.user   = {};
						$rootScope.userName = '';
						$rootScope.loggedIn = false;
					});
				});
	    	}
		}

	    $scope.me = function() {
			Facebook.api('/me', {fields: 'first_name'}, function(response) {
				$rootScope.user.name = response.first_name;
				$rootScope.userName = response.first_name;
			});
			Facebook.api('/me/picture', function(response) {
				console.log(response);
				$rootScope.user.picture = response.data.url;
			});
	    };

		/**
		* Taking approach of Events :D
		*/
		$scope.$on('Facebook:statusChange', function(ev, data) {
			console.log('Status: ', data);
			if (data.status === 'connected') {
				$scope.$apply(function() {
					// 
				});
			} else {
				$scope.$apply(function() {
					//

					// Dismiss byebye message after two seconds
					$timeout(function() {
						//
					}, 2000)
				});
			}
		});
	}
]);