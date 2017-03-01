'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, NgTableParams,$rootScope) {

$scope.idTitular;

$scope.init = function(){

    var foobarElement = document.body;
    foobarElement.style.backgroundColor = '#F6F6F5';
    foobarElement.style.backgroundImage = "url('../img/background-white.jpg')";

    $scope.user = JSON.parse(sessionStorage.usuario);
    $scope.isEnabledDownload = false;
    //getTitulares();
    getTickesWithTitular();
};

$scope.putIdTitular = function(data){
  $scope.idTitular = data;
}


function getTickesWithTitular(){
  var data;
  /*if(sessionStorage.dataTable){
    fillTable(JSON.parse(sessionStorage.dataTable));
    return;
  }*/
  callRestFactory.get(dataServices.pathGet('getTickesWithTitular', []))
            .then(function (rows) {
              console.log(rows.data);
               data = rows.data;
               //sessionStorage.dataTable = JSON.stringify(data);
               fillTable(data)

            })
            .catch(function () {
      //console.log('Error callBPC25', false);
    });

}


function fillTable(data){



              $scope.groupby = 'role'; //Default order IF null get table without groups(not possible ?)

              $scope.$watch("filter.$", function () {
                  $scope.tableParams.reload();
              });
                    //dinamic grouping
              $scope.tableParams = new NgTableParams({
                  page: 1,            // show first page
                  count: 5          // count per page
              }, {
                  groupBy: $scope.groupby,
                  total: function () { return data.length; }, // length of data
                  getData: function($defer, params) {
                    var filteredData = $filter('filter')(data, $scope.filter);
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, $scope.tableParams.orderBy()) :   filteredData;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                  }
              });
              $scope.$watch('groupby', function(value){
                $scope.tableParams.settings().groupBy = 'role';
                console.log('Scope Value', $scope.groupby);
                //console.log('Watch value', this.last);
                //console.log('new table',$scope.tableParams);
                $scope.tableParams.reload();
              });
}

 function getTitulares(){
  callRestFactory.get(dataServices.pathGet('getUsers', []))
            .then(function (datos) {
                var data = datos.data;

                        callRestFactory.get(dataServices.pathGet('getTicketValidate', []))
                         .then(function (dataValidate) {
                           var datav = dataValidate.data;
                              for (var key in datav) {
                                  for (var keydata in data) {

                                        if(data[keydata].estatus === '1'){
                                          data[keydata].documento = "success";
                                        }else if(data[keydata].id ===  datav[key].idUsuario)
                                              if((Number(data[keydata].numBoletos) - Number(  datav[key].vendidos)) ==0)
                                                  data[keydata].documento = "success";
                                              
                                          }
                                }
                          
                          })
                          .catch(function () {
                            //console.log('Error getTicketValidate', false);
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
                        //console.log('Error getUsers', false);
                      });
                   

             
                         $scope.$watch(data, function () {
                              $scope.usersTable.reload();
                            });

                        $scope.users=data;
                        $scope.usersTable = new NgTableParams({
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
                                        $defer.resolve($scope.data);
                          } 
                       });

                        $scope.usersTable.reload();
               
            })
            .catch(function () {
                //console.log('Error callBPC25', false);
            });


}

 
$scope.getReporte= function(){
  $scope.isEnabledDownload = true;
  callRestFactory.get(dataServices.pathGet('getDataReport', []))
    .then(function (datos) {
      $scope.dataCVS = datos.data;
      setTimeout(function () {                
        $("#exportaCVS" ).trigger( "click" );
      }, 2000);
    })
    .catch(function () {
      //console.log('Error callBPC25', false);
    });
}

$rootScope.logout = function(){
  sessionStorage.clear();
   window.location.href = "#!/login";
}




$scope.showImage = function(data,userTicket){

  $scope.pathImage = 'uploads/'+ data;
  
  /*var idUser = userTicket.idUsuario;
  $.post( "http://celebrausana.com/celebra-back/updateEstatus", { idUsuario: idUser })
    .done(function( datos ) {
      $("#squareCount"+idUser).css("background-color","green");
        //console.log( "Update Estatus" + datos );
  });*/
  
}


$scope.updateUser = function(data){
  //console.log(data);
  
  delete data['$edit'];
  delete data['$$hashKey'];
  delete data['imagen'];
  delete data['imagen2'];
  delete data['documento'];
  delete data['distTiecket'];
  
      var  dataUpdate = {};
      dataUpdate.id=data.role;
      dataUpdate.nombre=data.nombred;
      dataUpdate.apellidos=data.apellidosd;
      dataUpdate.ciudad=data.ciudadd;
      dataUpdate.estado=data.estadod;
      dataUpdate.telefono=data.telefonod;
      dataUpdate.email=data.emaild;
      
      dataUpdate.numBoletos=data.numBoletosd ;
      dataUpdate.noOrden=data.noOrdend == '' ? 'null':data.noOrdend;
      dataUpdate.rango=data.rangod;
      dataUpdate.avanceRango=data.avanceRangod;
      dataUpdate.motivadorPlatino=data.motivadorPlatinod;
      dataUpdate.motivadorPlatinoPremier=data.motivadorPlatinoPremierd;
      dataUpdate.ejecutivo=data.ejecutivod;
      dataUpdate.chf=data.chfd;
      dataUpdate.transferencia=data.transferenciad;
      dataUpdate.accesoEntrenamiento=data.accesoEntrenamientod;
      dataUpdate.accesoSalaEjecutiva=data.accesoSalaEjecutivad;
      dataUpdate.observaciones=data.observacionesd;

 
  
  $.post( sessionStorage.path+"/celebra-back/updateUser", { parameters: JSON.stringify(dataUpdate) })
  .done(function( data ) {
    //console.log( "Data Loaded: " + data );
  });


}


$scope.getTickes = function(user){
  $scope.user = user.id
    
    $.ajax({
      url: sessionStorage.path+"/celebra-back/getTickes",
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
                  
                  

                  $scope.usersTickets = new NgTableParams({
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
                //console.log("failure Validate POST");
          
          });
          
          
}


$scope.updateDataTicket = function(data,type){
  
  delete data['$editado'];
  delete data['$$hashKey'];
  
  var idUser = data.idUsuario;

 var dataUpdate = {};
  if(type == 'ticket'){
      dataUpdate.folio=data.folio;
      dataUpdate.nombre=data.nombre;
      dataUpdate.apellidos=data.apellidos;
      dataUpdate.ciudad=data.ciudad;
      dataUpdate.estado=data.estado;
      dataUpdate.telefono=data.telefono;
      dataUpdate.email=data.email;
      dataUpdate.foliom=data.foliom;
      dataUpdate.noOrden=data.noOrden == '' ? 'null':data.noOrden;
      dataUpdate.rango=data.rango;
      dataUpdate.avanceRango=data.avanceRango;
      dataUpdate.motivadorPlatino=data.motivadorPlatino;
      dataUpdate.motivadorPlatinoPremier=data.motivadorPlatinoPremier;
      dataUpdate.ejecutivo=data.ejecutivo;
      dataUpdate.chf=data.chf;
      dataUpdate.transferencia=data.transferencia;
      dataUpdate.accesoEntrenamiento=data.accesoEntrenamiento;
      dataUpdate.accesoSalaEjecutiva=data.accesoSalaEjecutiva;
      dataUpdate.observaciones=data.observaciones;
}


  
  if(data.folio != null){
      $.post( sessionStorage.path+"/celebra-back/updateTicket", { parameters: JSON.stringify(dataUpdate) })
      .done(function( data ) {
        //$scope.validateUertTickets(idUser);
        
        $.post( sessionStorage.path+"/celebra-back/updateEstatus", { idUsuario: idUser })
          .done(function( datos ) {
            $("#squareCount"+idUser).css("background-color","green");
          
            //console.log( "Update Estatus" + datos );
        });
      });

  }else{
      $scope.saveTicket (data);
  }

    


};



$scope.saveTicket = function(){

  var param = {};
  param.nombre = $scope.nombre;
  param.apellidos = $scope.apellidos;
  param.ciudad = $scope.ciudad;
  param.estado = $scope.estado;
  param.telefono = $scope.telefono;
  param.email = $scope.email;
  param.idUsuario =$scope.idTitular;
  param.foliom = $scope .foliom;
  param.imagen = "NULL";
  param.imagen2 = "NULL";
  //console.log(param);

  $.ajax({
        url: sessionStorage.path+"/celebra-back/newTicket",
        type: "post",
        data: { parameters: JSON.stringify(param) } ,
        success: function (data) {
            
             // $scope.validateUertTickets(userTicket.idUsuario);

          
      },
        error: function(jqXHR, textStatus, errorThrown) {
          //console.log("Error saveTicket");
        }
  });
  
};


$scope.saveTitutlar = function(){
var param = {};
param.id =$scope.id;
param.nombre =$scope.nombre;
param.apellidos =$scope.apellidos; 
param.ciudad =$scope.ciudad;
param.estado =$scope.estado;
param.telefono =$scope.telefono; 
param.email =$scope.email;
param.noOrden =$scope.noOrden; 
param.numBoletos =$scope.numBoletos;

  $('#btnSaveTicket').attr('disabled', true);
  $.ajax({
        url: sessionStorage.path+"/celebra-back/insertTitular",
        type: "post",
        data: { parameters: JSON.stringify(param) } ,
        success: function (data) {
           getTitulares(); 
           //console.log(data); 
          $('#myModalTitular').modal('hide');
       
 
          
      },
        error: function(jqXHR, textStatus, errorThrown) {
          //console.log(data);
          $('#myModalTitular').modal('hide');
            
        }


    });
    $scope.clearFieldsTitual();
};

$scope.clearFieldsTitual = function(){
    $scope.id ="";
    $scope.nombre ="";
    $scope.apellidos =""; 
    $scope.ciudad ="";
    $scope.estado ="";
    $scope.telefono =""; 
    $scope.email ="";
    $scope.noOrden =""; 
    $scope.numBoletos ="";

};


$scope.validateUertTickets = function(idUsuario){
    $.ajax({
          url: sessionStorage.path+"/celebra-back/getSellingByIdUsuario",
          type: "get",
          data: { idUsuario:idUsuario} ,
          success: function (data) {
              $.ajax({
                    url: sessionStorage.path+"/celebra-back/getTicketValidateByIdUser",
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
                        //console.log("Error saveTicket");
                    }
              });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              //console.log("Error saveTicket");
                }
          });
};



$scope.deleteDataTicket = function(data){
  
  var folio = data.folio;
    $.post( sessionStorage.path+"/celebra-back/deleteDataTicket", { folio: folio })
      .done(function( datos ) {
//        $("#squareCount"+idUser).css("background-color","green");
          //console.log( "Update Estatus" + datos );
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


$scope.selecTitular = function(idUsuario){
  $scope.idTitularDelete = idUsuario;
};


$scope.deleteTitutlar = function(idUsuario){

  //console.log('borrar'+$scope.idTitularDelete);
   $.ajax({
      url: sessionStorage.path+"/celebra-back/deleteTitular",
      type: "post",
      data: { idUsuario:$scope.idTitularDelete} ,
                    success: function (information) {
                        //console.log(information);
                        $('#myModalTitular').modal('hide');
                        $('#myModalConfirmar').modal('hide');
                        
                        getTitulares();
                          
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        //console.log("Error saveTicket");
                    }
              });
};





  $scope.init();

};
