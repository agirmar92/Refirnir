myApp.controller('eventController', [ '$scope', '$rootScope', '$location', '$routeParams', 'mySharedResources', 
	function ($scope, $rootScope, $location, $routeParams, mySharedResources) {
		$scope.currentEvent = {};
		$scope.editing = false;

        /*temp*/
        function Comment(text) {
            this.text = text;
            this.author = $rootScope.user.facebookID;
        }

        $scope.newComment = "";
        $scope.postComment = function() {
            if($scope.newComment !== "" && $rootScope.user.facebookID) {
                var commentToPost = new Comment($scope.newComment);
                mySharedResources.postComment($scope.currentEvent, commentToPost);
                $scope.newComment = "";
            }
        };

	var mainMarker = {
            lat: 64.08840715477538,
            lng: -21.927595138549805,
            focus: true,
            draggable: false
        };

	angular.extend($scope, {
            rvk: {
                lat: 64.09189505185019,
                lng: -21.9200420379639,
                zoom: 14
            },
            markers: {
                mainMarker: angular.copy(mainMarker)
            }
        });

        $scope.$watch('synced', function(newValue, oldValue) {
            if (newValue) {
                // succesfully synced
                $scope.currentEvent = mySharedResources.getEvent($routeParams.ID);
                if ($scope.currentEvent === null) {
                    $location.path("/boltar");
                }
                $scope.editing = false;
            }
        });

    	$scope.getName = function(id) {
    		return mySharedResources.getUser(id).name;
    	};

    	$scope.getPicture = function(id) {
    		return mySharedResources.getUser(id).picture;
    	};

    	$scope.saveEvent = function() {
    		//
    		$scope.editing = false;
    	};

    	$scope.deleteEventButton = function() {
            if($scope.isCreator()) {
        		if(confirm("Ertu viss um að þú viljir eyða þessum fallega bolta?")) {
    				mySharedResources.deleteEvent($scope.currentEvent).then(function(result) {
    					$location.path("/boltar");
    					console.log(result);
    				}, function(result) {
    					console.log(result);
    				});
        		}
            }
		};

		$scope.isCreator = function() {
			return ($scope.currentEvent.creator === $rootScope.user.facebookID);
		};

        $scope.isAuthor = function(id) {
            return (id === $rootScope.user.facebookID);
        };
	}
]);

myApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});