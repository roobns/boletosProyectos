'use strict';
module.exports = function($scope, dataServicesFactory,callRestFactory) {
    $scope.init = function (){
        $scope.clientID = "106736036";
        $scope.getSummary(); 
    };
    
    $scope.getSummary = function () {
        callRestFactory.get(dataServicesFactory.getAll('getSummary', [$scope.clientID]))
                .then(function (data) {
                    log(data);
                })
                .catch(function (err) {
                    console.log('err', err);
                });
    };
    
    var log = function (obj){
        console.log( obj);
    };
};