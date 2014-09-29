'use strict';

console.log(' >> executing app.js');

// Store some strings that we'll be using often
var appConfig = {

	firebaseUrl: 'https://lait-partyplanner.firebaseio.com',
	gMapsAPI: 'AIzaSyBefCUKkAfHHo_hYDxFeLaDGyehfO8GsXE'

};

// Create an Angular module representing our app
var partyPlannerApp = angular.module('PartyPlannerApp', [

	//'ngRoute',
	//'partyPlannerControllers'

]);

// Manually bootstrap our app
angular.element(document).ready(function() {

  angular.bootstrap(document, ['PartyPlannerApp']);

});