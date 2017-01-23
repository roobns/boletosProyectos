'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, ngTableParams,$rootScope) {



$scope.init = function(){
 $scope.dataList = [
                    {
                        id: 1,
                        name: 'github',
                        price: '200$',
                        publisher: {
                            name: 'hieutran',
                            company: 'Dtag-VN'
                        }
                    },
                    {
                        id: 2,
                        name: 'google',
                        price: '300$',
                        publisher: {
                            name: 'tran',
                            company: 'Vietname'
                        }
                    }
                ];
  

	$.ajax({
		url: "http://celebrausana.com/celebra-back/getUsers",
        method: "GET",
         async: false,
            
        }).done(function (data, textStatus, xhr) {
          console.log(data);
             
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


$scope.getTickes = function(user){
  $scope.user = user
     
    $.ajax({
      url: "http://celebrausana.com/celebra-back/getTickes",
          method: "GET",
          data: { idUsuario: $scope.user},
           async: false,
              
          }).done(function (data, textStatus, xhr) {
              $scope.users = data;
              if($scope.users.length != undefined){
              
              $scope.usersTickets = new ngTableParams({
                    page: 1
                }, {
                    total: $scope.users.length, 
                    getData: function ($defer, params) {
                       $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
                       $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data);
                    }
              });
            }else{
              $scope.data = { };
            }

              
          }).fail(function (data, textStatus, xhr) {
            $scope.users = [];
              console.log("failure Validate POST");
          
          });
}


$scope.updateDataTicket = function(data){
  delete data['$editado'];
  delete data['$$hashKey'];
  console.log(data);
  $.post( "http://celebrausana.com/celebra-back/updateTicket", { parameters: JSON.stringify(data) })
  .done(function( data ) {
    console.log( "Data Loaded: " + data );
  });
};



  $scope.init();

};
