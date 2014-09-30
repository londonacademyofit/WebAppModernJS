console.log(' >> executing user-profile.js');

angular.module('user-profile', [])

.config(['$routeProvider', function($routeProvider) {

  // fetch the correct HTML template / view for this module

  $routeProvider.when('/', {

   	templateUrl:'js/html2js/core/user-profile/user-profile.tpl.js',

    controller:'UserProfileCtrl'

})

.controller('UserProfileCtrl', ['$scope', '$firebase', function($scope, $firebase) {

	console.log('>> UserProfileCtrl');
	
	// $scope.user = Hull.currentUser();
	
}]);