'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, ngTableParams,$rootScope) {

$scope.init = function(){
	$.ajax({
		url: "http://celebrausana.com/celebra-back/getUsers",
        method: "GET",
         async: false,
            
        }).done(function (data, textStatus, xhr) {
            $scope.users=data;
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: $scope.users.length, 
                getData: function ($defer, params) {
			   $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
			   $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
			   $defer.resolve($scope.data);
			}
			            });
        }).fail(function (data, textStatus, xhr) {
            console.log("failure Validate POST");
            //console.log("operationToken-BursanetRestful: " + xhr.getResponseHeader("X-CSRF-TOKEN"));
            //sessionStorage.setItem("operationToken-BursanetRestful", xhr.getResponseHeader("X-CSRF-TOKEN"));
        });

};
 

$scope.updateUser = function(data){
  console.log(data);
  
  delete data['$edit'];
  delete data['$$hashKey'];
   $.post( "http://celebrausana.com/celebra-back/updateUser", { parameters: JSON.stringify(data) })
  .done(function( data ) {
    console.log( "Data Loaded: " + data );
  });


}


  $scope.init();

};
