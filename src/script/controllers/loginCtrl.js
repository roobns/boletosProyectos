'use strict';

module.exports = function($scope, $http, $filter,dataServices, callRestFactory, errorMessageHandler) {

$scope.init = function(){

};




$scope.login = function () {
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                email: $scope.email,
                pwd: $scope.pwd
            });
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('http://celebrausana.com/celebra-back/login', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };

    


  $scope.init();
};
