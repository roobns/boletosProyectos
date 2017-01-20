'use strict';

module.exports = function($scope, $http, $filter,dataServices, callRestFactory, errorMessageHandler,$rootScope) {

$scope.init = function(){
    
    if(sessionStorage.usuario){
        console.log(sessionStorage.usuario);
        window.location.href = "#!/indexPrivado";
    }        
};


$scope.login = function () {

  $.post( "http://celebrausana.com/celebra-back/login", { email: $scope.email,pwd: $scope.pwd})
    .done(function( data ) {
      if(data.status == "Failed"){ 
          $("#alertLogin").fadeIn( "fast" );
          setTimeout(function(){ $("#alertLogin").fadeOut(); }, 2000);
      }else{
            sessionStorage.usuario = data.user;
            if(JSON.parse(data.user).rol == "1"){ 
              window.location.href = "#!/administrator";
            }else{ 

              window.location.href = "#!/indexPrivado";
            }
              
      }
  });
};

    


  $scope.init();
};
