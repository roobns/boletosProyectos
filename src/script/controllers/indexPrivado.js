'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, ngTableParams,$rootScope) {

$scope.init = function(){
	$scope.imagen1  = null;
	$scope.imagen2  = null;
	var foobarElement = document.body;
	foobarElement.style.backgroundColor = '#F6F6F5';
	foobarElement.style.backgroundImage = "url('../img/background-white.jpg')";

	$scope.showUploadFile = false;
	$scope.styleSquare = "max-width:100px;background-color: red;margin-right:5px;";
	if(sessionStorage.usuario){
		$scope.getTickes();
		
	}else
		window.location.href = "#!/login";    

	$.ajax({
			url: sessionStorage.path+"/celebra-back/getNumberTickets",
	        method: "GET",
	        data: { id: $scope.user.id},
	         async: true,
	            
	        }).done(function (data, textStatus, xhr) {
	            $scope.user.numBoletos =  JSON.parse(data)[0].numBoletos;

	            //sessionStorage.usuario = data.user;

	           
	        }).fail(function (data, textStatus, xhr) {
	            console.log("failure Validate POST");
	            //console.log("operationToken-BursanetRestful: " + xhr.getResponseHeader("X-CSRF-TOKEN"));
	            //sessionStorage.setItem("operationToken-BursanetRestful", xhr.getResponseHeader("X-CSRF-TOKEN"));
	        });




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
                        console.log("Error saveTicket");
                    }
              });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log("Error saveTicket");
                }
          });
};


 
$rootScope.logout = function(){
	sessionStorage.clear();
	 window.location.href = "#!/login";
}


$scope.getTickes = function(){
	$scope.user = JSON.parse(sessionStorage.usuario);
	$scope.asignados = 0;
	$scope.disponibles = 0;
	 
	 	 $('#addSell').attr('disabled', false);
		$.ajax({
			url: sessionStorage.path+"/celebra-back/getTickes",
	        method: "GET",
	        data: { idUsuario: $scope.user.id},
	         async: true,
	            
	        }).done(function (data, textStatus, xhr) {
	            $scope.users = JSON.parse(data);

	            if($scope.users.length != undefined){

	            	if(Number($scope.user.numBoletos) === $scope.users.length){
	            		$('#addSell').attr('disabled', true);
	            	}
	            	$scope.asignados = $scope.users.length;
		            $scope.disponibles = Number($scope.user.numBoletos) - $scope.users.length;

		            if($scope.disponibles == 0) {
						$scope.styleSquare = "max-width:100px;background-color: green;margin-right:5px;";
		            }

		            $scope.$watch($scope.users, function () {
		                  $scope.usersTable.reload();
		                });

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

					$scope.usersTable.reload();
	        	}
	        }).fail(function (data, textStatus, xhr) {
	            console.log("failure Validate POST");
	            //console.log("operationToken-BursanetRestful: " + xhr.getResponseHeader("X-CSRF-TOKEN"));
	            //sessionStorage.setItem("operationToken-BursanetRestful", xhr.getResponseHeader("X-CSRF-TOKEN"));
	        });


	        
    		

}




var control = document.getElementById("inputFileToLoad");
control.addEventListener("change", function(event) {
	 var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {


      var fileToLoad = filesSelected[0];
      if(filesSelected[0].type == "image/png")
      	$scope.extimg1 = ".png"
      else if(filesSelected[0].type == "image/jpeg")
      	$scope.extimg1 = ".jpg"

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        var newImage = document.createElement('img');
        newImage.src = srcData;
        $scope.imageOne = srcData.replace(/^data:image\/(png|jpg);base64,/, "");;
		document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
    

}, false);


var control = document.getElementById("inputFileToLoad2");
control.addEventListener("change", function(event) {
	 var filesSelected = document.getElementById("inputFileToLoad2").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      if(filesSelected[0].type == "image/png")
      	$scope.extimg2 = ".png"
      else if(filesSelected[0].type == "image/jpeg")
      	$scope.extimg2 = ".jpg"


      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcDataSecond = fileLoadedEvent.target.result; // <--- data: base64

        var newImage = document.createElement('img');
        newImage.src = srcDataSecond;
        $scope.imageSecond = srcDataSecond;
		document.getElementById("imgTest2").innerHTML = newImage.outerHTML;
        //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
    

}, false);


$scope.saveTicket = function(){
	$('#btnSaveTicket').attr('disabled', true);
	$.ajax({
        url: sessionStorage.path+"/celebra-back/newTicket",
        type: "post",
        data: { parameters: "{\"nombre\": \""+$scope.nombre+"\", \"apellidos\": \""+$scope.apellidos+"\",\"ciudad\": \""+$scope.ciudad+"\", \"estado\": \""+$scope.estado+"\", \"telefono\": \""+$scope.telefono+"\",\"email\": \""+$scope.email+"\", \"idUsuario\": \""+$scope.user.id+"\", \"foliom\": \""+$scope.foliom+"\", \"imagen\": \"null\", \"imagen2\": \"null\"}" } ,
        success: function (data) {
        	
        	$('#myModal').modal('hide');
        	$scope.getTickes();

	        $('#btnSaveTicket').attr('disabled', false);    
	        //location.reload();      
	        $scope.validateUertTickets($scope.user.id);
	    },
        error: function(jqXHR, textStatus, errorThrown) {
        	$('#myModal').modal('hide');
            $scope.getTickes();
        }


    });
    $scope.limpiar();
};

$scope.showModalData= function(data){
	$('#myModal').modal('show');
	$scope.showUploadFile = true;

	$scope.folio  = data.folio;
    $scope.idUsuario  = data.idUsuario;
	$scope.email  = data.email;
	$scope.telefono  = data.telefono;
	$scope.estado  = data.estado;
	$scope.ciudad  = data.ciudad;
	$scope.apellidos  =data.apellidos;
	$scope.nombre  = data.nombre;
	$scope.imagen1  = data.imagen;
	$scope.imagen2  = data.imagen2;
};


$scope.uploadFile = function(){
	var formData = new FormData(document.getElementsByName('userForm')[0]);// yourForm: form selector        
        $.ajax({
            type: "POST",
            url: sessionStorage.path+"/upload.php",// where you wanna post
            data: formData,
            processData: false,
            contentType: false,
               error: function(jqXHR, textStatus, errorMessage) {
                  console.log(errorMessage); // Optional
              },
               success: function(data) {
               	if($scope.extimg1!== undefined)
               		$scope.updatePathFile({folio:$scope.folio,imagen:"img_"+$scope.folio+"_1"+$scope.extimg1});
               	
               	if($scope.extimg2!== undefined)
               		$scope.updatePathFile({folio:$scope.folio,imagen2:"img_"+$scope.folio+"_2"+$scope.extimg2});
               	  $scope.getTickes();
               	$('#myModal').modal('hide');
               	console.log(data)

               } 
        });

};


$scope.updatePathFile = function(data){
  console.log(data);
  
  
   $.post( sessionStorage.path+"/celebra-back/updateTicket", { parameters: JSON.stringify(data) })
  .done(function( data ) {
    console.log( "Data Loaded: " + data );
  });


}

$scope.limpiar = function(){
	$scope.folio  = "";       
    $scope.idUsuario  = "";
	$scope.email  = "";
	$scope.telefono  = "";
	$scope.estado  = "";
	$scope.ciudad  = "";
	$scope.apellidos  = "";
	$scope.nombre  = "";
	$scope.foliom  = "";
}




   $scope.init();

};
