'use strict';

module.exports = function($scope, $http, $filter,dataServices, callRestFactory, errorMessageHandler,$rootScope) {

$scope.init = function(){
var foobarElement = document.body;
foobarElement.style.backgroundColor = '#000';
foobarElement.style.backgroundImage = "url('../img/background-photo.jpg')";


    if(sessionStorage.usuario){
        console.log(sessionStorage.usuario);
        window.location.href = "#!/indexPrivado";
    }        
};


$scope.login = function () {

     var data = {
               email: $scope.email,pwd: $scope.pwd
            };
        
    callRestFactory.post(dataServices.pathGet('login', []),data)
            .then(function (datos) {
                 var data = datos.data;
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
               
            })
            .catch(function () {
                $scope.showMessage('Error callBPC25', false);
            });
           
};

    


  $scope.init();
};
