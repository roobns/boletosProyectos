'use strict';

module.exports = function($scope, $http, $filter,dataServices, callRestFactory, errorMessageHandler,$rootScope) {

$scope.init = function(){
    var foobarElement = document.body;
  foobarElement.style.backgroundColor = '#F6F6F5';
  foobarElement.style.backgroundImage = "url('../img/background-white.jpg')";
    
    /*if(sessionStorage.usuario){
        console.log(sessionStorage.usuario);
        window.location.href = "#!/indexPrivado";
    }*/        
};


$scope.sendMail = function () {

  console.log("Enviando mail.....");
  var data = {
               email: $scope.correo
            };

   callRestFactory.post(dataServices.pathGet('sendMail', []),data)
            .then(function (datos) {
                 console.log(datos);
               
  }).catch(function () {
      $scope.showMessage('Error callBPC25', false);
  });


};

    


  $scope.init();
};
