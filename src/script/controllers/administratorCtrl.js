'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, ngTableParams,$rootScope) {

$scope.init = function(){
	$.ajax({
		url: "http://celebrausana.com/celebra-back/getUsers",
        method: "GET",
         async: false,
            
        }).done(function (data, textStatus, xhr) {
             
             $scope.$watch(data, function () {
                  $scope.usersTable.reload();
                });

            $scope.users=data;
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 100
            }, {
               
                total: $scope.users.length, 

                getData: function ($defer, params) {
      			      // use build-in angular filter
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(data, params.orderBy()) :
                                    data;
                            orderedData = params.filter() ?
                                    $filter('filter')(orderedData, params.filter()) :
                                    orderedData;

                            params.total(orderedData.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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
