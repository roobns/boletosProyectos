'use strict';

module.exports = function($scope, $filter, dataServices, callRestFactory, errorMessageHandler, ngTableParams,$rootScope) {

$scope.init = function(){

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
	 
	 	 $('#addSell').attr('disabled', false);
		$.ajax({
			url: "http://celebrausana.com/celebra-back/getTickes",
	        method: "GET",
	        data: { idUsuario: $scope.user.id},
	         async: false,
	            
	        }).done(function (data, textStatus, xhr) {
	            $scope.users=data;
	            if($scope.users.length != undefined){

	            	if(Number($scope.user.numBoletos) === $scope.users.length){
	            		$('#addSell').attr('disabled', true);
	            	}

		            $scope.asignados = Number($scope.user.numBoletos) - $scope.users.length;
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
	$.ajax({
        url: "http://celebrausana.com/celebra-back/newTicket",
        type: "post",
        data: { parameters: "{\"nombre\": \""+$scope.nombre+"\", \"apellidos\": \""+$scope.apellidos+"\",\"ciudad\": \""+$scope.ciudad+"\", \"estado\": \""+$scope.estado+"\", \"telefono\": \""+$scope.telefono+"\",\"email\": \""+$scope.email+"\", \"idUsuario\": \""+$scope.user.id+"\", \"imagen\": \"null\", \"imagen2\": \"null\"}" } ,
        success: function (data) {
        	$('#modal').modal('hide');
        	$scope.getTickes();

	    	$("#alertSell").fadeIn( "fast" );
	        setTimeout(function(){ $("#alertLogin").fadeOut(); }, 2000);
	        //console.log( "Data Loaded: " + data );               
	        
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	$('#modal').modal('hide');
           $scope.getTickes();
        }


    });

};


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
