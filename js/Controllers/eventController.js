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
        $scope.comments = [];
        $scope.postComment = function() {
            if($scope.newComment !== "") {
                var commentToPost = new Comment($scope.newComment);
                $scope.comments.push(commentToPost);
                $scope.newComment = "";
            }
        };

		angular.element(document).ready(function () {
        	$scope.currentEvent = mySharedResources.getEvent($routeParams.ID);
        	if (!$rootScope.loggedIn || $scope.currentEvent === null) {
        		$location.path("/boltar");
        	}
        	$scope.editing = false;
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
    		if(confirm("Ertu viss um að þú viljir eyða þessum fallega bolta?")) {
				mySharedResources.deleteEvent($scope.currentEvent).then(function(result) {
					$location.path("/boltar");
					console.log(result);
				}, function(result) {
					console.log(result);
				});
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