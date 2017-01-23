'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, ngTableParams,$rootScope) {

$scope.init = function(){

	$scope.showUploadFile = false;
	$scope.styleSquare = "max-width:100px;background-color: red;margin-right:5px;";
	if(sessionStorage.usuario){
		$scope.getTickes();
		
	}else
		window.location.href = "#!/login";    

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
			url: "http://celebrausana.com/celebra-back/getTickes",
	        method: "GET",
	        data: { idUsuario: $scope.user.id},
	         async: false,
	            
	        }).done(function (data, textStatus, xhr) {
	            $scope.users = data;
	            if($scope.users.length != undefined){

	            	if(Number($scope.user.numBoletos) === $scope.users.length){
	            		$('#addSell').attr('disabled', true);
	            	}
	            	$scope.asignados = $scope.users.length;
		            $scope.disponibles = Number($scope.user.numBoletos) - $scope.users.length;

		            if($scope.disponibles == 0) {
						$scope.styleSquare = "max-width:100px;background-color: green;margin-right:5px;";
		            }
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
        url: "http://celebrausana.com/celebra-back/newTicket",
        type: "post",
        data: { parameters: "{\"nombre\": \""+$scope.nombre+"\", \"apellidos\": \""+$scope.apellidos+"\",\"ciudad\": \""+$scope.ciudad+"\", \"estado\": \""+$scope.estado+"\", \"telefono\": \""+$scope.telefono+"\",\"email\": \""+$scope.email+"\", \"idUsuario\": \""+$scope.user.id+"\", \"imagen\": \"null\", \"imagen2\": \"null\"}" } ,
        success: function (data) {
        	$('#myModal').modal('hide');
        	$scope.getTickes();

	    	$("#alertSell").fadeIn( "fast" );
	        setTimeout(function(){ $("#alertLogin").fadeOut(); }, 2000);
	        $('#btnSaveTicket').attr('disabled', false);          
	        
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	$('#myModal').modal('hide');
            $scope.getTickes();
        }


    });
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
            url: "upload.php",// where you wanna post
            data: formData,
            processData: false,
            contentType: false,
               error: function(jqXHR, textStatus, errorMessage) {
                  console.log(errorMessage); // Optional
              },
               success: function(data) {
               	$scope.updatePathFile({folio:$scope.folio,imagen:"img_"+$scope.folio+"_1"+$scope.extimg1,imagen2:"img_"+$scope.folio+"_2"+$scope.extimg2});
               	$('#myModal').modal('hide');
               	console.log(data)

               } 
        });

};


$scope.updatePathFile = function(data){
  console.log(data);
  
  
   $.post( "http://celebrausana.com/celebra-back/updateTicket", { parameters: JSON.stringify(data) })
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
}




   $scope.init();

};
