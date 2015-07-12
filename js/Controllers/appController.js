myApp.controller('appController', [ '$scope', '$location', '$routeParams', '$timeout', 'mySharedResources', 'currentUser', 'Facebook', 
	function ($scope, $location, $routeParams, $timeout, mySharedResources, currentUser, Facebook) {
		$scope.userName = currentUser.userName;
		$scope.loggedIn = false;
		$scope.user = {};
		// And some fancy flags to display messages upon user status change
		$scope.byebye = false;
		$scope.salutation = false;

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
			  $scope.facebookReady = true;
		});

		var userIsConnected = false;
      
		Facebook.getLoginStatus(function(response) {
			if (response.status === 'connected') {
			  	$scope.loggedIn = true;
			  	Facebook.api('/me', function(response) {
			  		currentUser.ID = response.id;
					currentUser.userName = response.name;
					$scope.userName = response.name;
			  	});
			}
		});

		/**
		* IntentLogin
		*/
		$scope.IntentLogin = function() {
			if(!$scope.loggedIn) {
			 	 $scope.login();
			}
		};

		/**
		* Login
		*/
		$scope.login = function() {
			Facebook.login(function(response) {
			  	if (response.status === 'connected') {
			  		console.log(response);
				    $scope.loggedIn = true;
				    $scope.me();
			  	}
			});
		};

		/**
        * me 
        */
        $scope.me = function() {
			Facebook.api('/me', function(response) {
				// Þetta er allt sem response gefur mér eins og er
				currentUser.ID = response.id;
				currentUser.userName = response.name;
				$scope.userName = response.name;

				/**
				 * Using $scope.$apply since this happens outside angular framework.
				 */
				$scope.$apply(function() {
				 	 $scope.user = response;
				});
			});
        };

        /**
		* Logout
		*/
		$scope.logout = function() {
			Facebook.logout(function() {
				$scope.$apply(function() {
					$scope.user   = {};
					$scope.loggedIn = false;  

					currentUser.ID = '';
					currentUser.userName = '';
					$scope.userName = '';
				});
			});
		}
      
      	/**
		* Taking approach of Events :D
		*/
  		$scope.$on('Facebook:statusChange', function(ev, data) {
	        console.log('Status: ', data);
	        if (data.status === 'connected') {
	          $scope.$apply(function() {
	            $scope.salutation = true;
	            $scope.byebye     = false;    
	          });
	        } else {
	          $scope.$apply(function() {
	            $scope.salutation = false;
	            $scope.byebye     = true;
	            
	            // Dismiss byebye message after two seconds
	            $timeout(function() {
	              $scope.byebye = false;
	            }, 2000)
	          });
	        }
      	});
	}
]);