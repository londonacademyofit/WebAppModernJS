'use strict';

console.log(' >> executing app.js');

// store some strings that we'll be using often

var appConfig = {

	firebaseUrl: 'https://lait-partyplanner.firebaseio.com',
	gMapsAPI: 'AIzaSyBefCUKkAfHHo_hYDxFeLaDGyehfO8GsXE'

};

// create an Angular module representing our app, registering its component modules

angular.module('PartyPlannerApp', [

	'ngRoute',
	'firebase'

]);

// manually bootstrap our app

angular.element(document).ready(function() {

  angular.bootstrap(document, ['PartyPlannerApp']);

});

// use $locationProvider to configure how the app's deep-linking paths are stored

angular.module('PartyPlannerApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$locationProvider.html5Mode(true);
	
	$routeProvider.otherwise({redirectTo:'/'});

}]);

// AppCtrl provides app-wide functionality, e.g. user authentication

angular.module('PartyPlannerApp').controller('AppCtrl', ['$scope', '$location', '$firebase', '$firebaseSimpleLogin', function($scope, $location, $firebase, $firebaseSimpleLogin) {

	$scope.test = 'Hello world!';

	// set up Firebase's Simple Login service ready to respond to .login() and .logout() calls

	var firebaseRef = new Firebase(appConfig.firebaseUrl);

	var authClient = $firebaseSimpleLogin(firebaseRef, function(error, user) {

		if (error) {

			console.log('error:', error);

			alert('There was an error with the login process. Please try again.')

		}

		if (user) {
		
			console.log('user logged in:', user);

			// if the user is logged in, set/update their Firebase entry

			firebaseRef.child('users').child(user.uid).set({

				// NOTE: come back later to add a user's profile photo to their Firebase entry
				// as per https://dev.twitter.com/rest/reference/get/users/show

				displayName: user.displayName,
				provider: user.provider,
				provider_id: user.id
			
			});		

		} else {

			console.log('user not logged in');

		}

	});

	// watch for any user authentication changes and show the right buttons accordingly

	var authRef = new Firebase(appConfig.firebaseUrl + '/.info/authenticated');

	authRef.on('value', function(snapshot) {

		if (snapshot.val() === true) {

			console.log('authRef change: user logged in');

			$('.logout').show();

			$('.login .loading-gif').show();

			$('.login input[type="button"]').hide();

			$location.url('/');

		} else {

			console.log('authRef change: user not logged in');

			$('.logout').hide();

			$('.login .loading-gif').hide();

			$('.login input[type="button"]').show();

			$location.url('/');

		}

	});

	// when the .login-twitter button is clicked, log the user in with their Twitter account
	// (detailed instructions: https://www.firebase.com/docs/web/guide/simple-login/twitter.html)

	$('input[type="button"].login-twitter').click(function() {
		
		authClient.$login('twitter');

		console.log('Logged in with Twitter');

	});

	// the logout button should log the user out

	$('.logout input[type="button"]').click(function() {

		authClient.$logout();

		console.log('user logged out');

	});

}]);