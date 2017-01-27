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

                        callRestFactory.get(dataServices.pathGet('getTicketValidate', []))
                         .then(function (dataValidate) {
                           var datav = dataValidate.data;
                              for (var key in datav) {
                                  for (var keydata in data) {
                                         if(data[keydata].id ===  datav[key].idUsuario)
                                              if((Number(data[keydata].numBoletos) - Number(  datav[key].vendidos)) ==0)
                                                  data[keydata].documento = "success";
                                              
                                          }
                                }
                          
                          })
                          .catch(function () {
                            console.log('Error getTicketValidate', false);
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
  delete data['distTiecket'];
  
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
                  $scope.users = JSON.parse(data);

                  var nBoletos = Number(user.numBoletos);
                  
                  if(data.status === "Failed" || $scope.users.tipo=== "0"){
                      var nbolresgis = 0;
                      $scope.users = [];
                  }else{
                    var nbolresgis = $scope.users.length;
                  }

                 var faltante = (nBoletos -  nbolresgis  );
                  
                  for(var x=0;x<faltante;x++){
                      $scope.users.push({apellidos:null,ciudad:null,email:null,estado:null,folio:null,idUsuario:$scope.user,imagen:null,imagen2:null,nombre:null,telefono:null});

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
  
  var idUser = data.idUsuario;
  
  if(data.folio != null){
      $.post( "http://celebrausana.com/celebra-back/updateTicket", { parameters: JSON.stringify(data) })
      .done(function( data ) {
            $scope.validateUertTickets(idUser);



          $.post( "http://celebrausana.com/celebra-back/updateEstatus", { idUsuario: idUser })
          .done(function( datos ) {
            $("#squareCount"+idUser).css("background-color","green");
            console.log( "Update Estatus" + datos );
          });
      });

  }else{
      $scope.saveTicket (data);
  }

    


};



$scope.saveTicket = function(userTicket){
  
  var param = {};
  param.nombre = userTicket.nombre;
  param.apellidos = userTicket.apellidos;
  param.ciudad = userTicket.ciudad;
  param.estado = userTicket.estado;
  param.telefono = userTicket.telefono;
  param.email = userTicket.email;
  param.idUsuario = userTicket.idUsuario;
  param.foliom = userTicket.foliom;
  param.imagen = "NULL";
  param.imagen2 = "NULL";
  console.log(param);

  $.ajax({
        url: "http://celebrausana.com/celebra-back/newTicket",
        type: "post",
        data: { parameters: JSON.stringify(param) } ,
        success: function (data) {
            
              $scope.validateUertTickets(userTicket.idUsuario);

          
      },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error saveTicket");
        }
  });
  
};


$scope.validateUertTickets = function(idUsuario){
    $.ajax({
          url: "http://celebrausana.com/celebra-back/getSellingByIdUsuario",
          type: "get",
          data: { idUsuario:idUsuario} ,
          success: function (data) {
              $.ajax({
                    url: "http://celebrausana.com/celebra-back/getTicketValidateByIdUser",
                    type: "get",
                    data: { idUsuario:idUsuario} ,
                    success: function (information) {
                        var vendidos = Number(JSON.parse(data)[0].vendidos);
                        var bn = Number($("#nboletos"+idUsuario).text());
      
                        $("#asignados"+idUsuario).text(vendidos);
                        $("#disponibles"+idUsuario).text(bn - vendidos);

                        if(bn != Number(JSON.parse(information)[0].vendidos))
                          $("#squareCount"+idUsuario).css("background-color", "red");
                        else
                          $("#squareCount"+idUsuario).css("background-color", "green");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log("Error saveTicket");
                    }
              });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log("Error saveTicket");
                }
          });
};



$scope.deleteDataTicket = function(data){
  
  var folio = data.folio;
    $.post( "http://celebrausana.com/celebra-back/deleteDataTicket", { folio: folio })
      .done(function( datos ) {
//        $("#squareCount"+idUser).css("background-color","green");
          console.log( "Update Estatus" + datos );
          $scope.getTickes (data.idUsuario);
          var x=0;
           $("#tr_"+data.folio+" td").each(function(a){
              if(x<=8)
                $(this).html("");
              x=x+1;
          });

           
          $('#tr_'+data.folio).removeClass("success").addClass("danger");

           $scope.validateUertTickets(data.idUsuario);


      });
  


};




  $scope.init();

};
