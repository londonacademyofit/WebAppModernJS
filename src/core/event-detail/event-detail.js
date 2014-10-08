console.log('executing event-detail.js');

angular.module('event-detail', [])

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template for this module

		$routeProvider.when('/event/:eventId', {

		    controller: 'EventDetailCtrl',

		   	templateUrl: 'event-detail/event-detail.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('EventDetailCtrl', ['$scope', '$location', '$routeParams', 'currentUser', 'authWatch', '$firebase', function($scope, $location, $routeParams, currentUser, authWatch, $firebase) {

		console.log(' > EventDetailCtrl');

		var userId = currentUser.provider + ':' + currentUser.id;
		
		var eventRef = new Firebase(appConfig.firebaseUrl + '/users/' + userId + '/events/' + $routeParams.eventId);
			
		var event = $firebase(eventRef);

		$scope.event = event.$asObject();
		
	}]);