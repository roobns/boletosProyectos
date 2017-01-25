'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, ngTableParams,$rootScope) {



$scope.init = function(){

var foobarElement = document.body;
foobarElement.style.backgroundColor = '#F6F6F5';
foobarElement.style.backgroundImage = "url('../img/background-white.jpg')";

$scope.user = JSON.parse(sessionStorage.usuario);

    callRestFactory.get(dataServices.pathGet('getUsers', []))
            .then(function (datos) {
                var data = datos.data;

                      callRestFactory.get(dataServices.pathGet('getWrongUser', []))
                      .then(function (dataWrongData) {

                          var dataWrong = dataWrongData.data;
                            for (var key in dataWrong) {
                                      for (var keydata in data) {
                                            if(data[keydata].id ===  dataWrong[key].idUsuario)
                                                data[keydata].documento = "error";
                                             

                                         // data[keydata].numBoletos;
                                          //$scope.asignados = data[keydata].numBoletos;
                                          //$scope.disponibles = Number($scope.user.numBoletos) - $scope.users.length;

                                          //ata[keydata].distTiecket = { numBoletos:data[keydata].numBoletos ,asignados:$scope.asignados,disponibles:$scope.disponibles };
                                      }
                            }
                      
                      })
                      .catch(function () {
                        console.log('Error getUsers', false);
                      });


                        callRestFactory.get(dataServices.pathGet('getSelling', []))
                      .then(function (dataSelling) {

                          var dataSelling = dataSelling.data;
                            for (var key in dataSelling) {
                                      for (var keydata in data) {
                                            if(data[keydata].id ===  dataSelling[key].idusiario){

                                         // data[keydata].numBoletos;
                                          $scope.asignados = Number(dataSelling[key].vendidos)
                                          $scope.disponibles = Number(data[keydata].numBoletos) - Number(dataSelling[key].vendidos);

                                          data[keydata].distTiecket = { numBoletos:data[keydata].numBoletos ,asignados:$scope.asignados,disponibles:$scope.disponibles };
                
                                            }
                                                
                                             

                                      }
                            }
                      
                      })
                      .catch(function () {
                        console.log('Error getUsers', false);
                      });



                      http://celebrausana.com/celebra-back/getSelling

             
             $scope.$watch(data, function () {
                  $scope.usersTable.reload();
                });

            $scope.users=data;
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 10
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
               
            })
            .catch(function () {
                console.log('Error callBPC25', false);
            });



  


};
 
$rootScope.logout = function(){
  sessionStorage.clear();
   window.location.href = "#!/login";
}


$scope.showImage = function(data,userTicket){
 
  $scope.pathImage = 'uploads/'+ data;
   var idUser = userTicket.idUsuario;
  
      $.post( "http://celebrausana.com/celebra-back/updateEstatus", { idUsuario: idUser })
      .done(function( datos ) {
        $("#squareCount"+idUser).css("background-color","green");
        console.log( "Update Estatus" + datos );
      });
  
}

$scope.updateUser = function(data){
  console.log(data);
  
  delete data['$edit'];
  delete data['$$hashKey'];
  delete data['imagen'];
  delete data['imagen2'];
  delete data['documento'];
  
   $.post( "http://celebrausana.com/celebra-back/updateUser", { parameters: JSON.stringify(data) })
  .done(function( data ) {
    console.log( "Data Loaded: " + data );
  });


}


$scope.getTickes = function(user){
  $scope.user = user.id
    
    $.ajax({
      url: "http://celebrausana.com/celebra-back/getTickes",
          method: "GET",
          data: { idUsuario: $scope.user},
           async: false,
              
          }).done(function (data, textStatus, xhr) {
                  $scope.users = data;

                  var nBoletos = Number(user.numBoletos);
                  
                  if(data.status === "Failed"){
                      var nbolresgis = 0;
                      $scope.users = [];
                  }else{
                    var nbolresgis = $scope.users.length;
                  }


                  var faltante = (nBoletos -  nbolresgis  );
                  
                  for(var x=0;x<faltante;x++){
                      $scope.users.push({apellidos:null,ciudad:null,email:null,estado:null,folio:null,idUsuario:null,imagen:null,imagen2:null,nombre:null,telefono:null});

                    }


                  if($scope.users.length != undefined){
                  
                  $scope.usersTickets = new ngTableParams({
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
  var idUser = data.idUsuario;
  
  $.post( "http://celebrausana.com/celebra-back/updateTicket", { parameters: JSON.stringify(data) })
  .done(function( data ) {
      $.post( "http://celebrausana.com/celebra-back/updateEstatus", { idUsuario: idUser })
      .done(function( datos ) {
        $("#squareCount"+idUser).css("background-color","green");
        console.log( "Update Estatus" + datos );
      });
  });


};



  $scope.init();

};
