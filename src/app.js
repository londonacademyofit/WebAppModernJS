'use strict';

console.log('executing app.js');

// Create an Angular module representing our app
var partyPlannerApp =  angular.module('PartyPlannerApp', [

	'ngRoute',
	'partyPlannerControllers'

]);

// Manually bootstrap our app
angular.element(document).ready(function() {

  angular.bootstrap(document, ['PartyPlannerApp']);

});