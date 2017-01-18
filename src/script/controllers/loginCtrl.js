'use strict';

module.exports = function($scope, $http, $filter,dataServices, callRestFactory, errorMessageHandler) {

$scope.init = function(){

};

$scope.login = function(){
	var data= 'email=' + $scope.email + '&pwds=' + $scope.password;
	$http.post('http://celebrausana.com/celebra-back/login', data )
	.success(function(data, status, headers, config) {
		$scope.message = data;
	})
	.error(function(data, status, headers, config) {
		alert( "failure message: " + JSON.stringify({data: data}));
	});
}


  $scope.init();
};
