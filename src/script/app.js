'use strict';
var app = angular.module("recordApp", ["ngRoute"]);
require('./services');
require('./filters');
require('./directives');
require('./controllers');


app.config(function($routeProvider) {
  $routeProvider
    .when('/indexPrivado', {
      templateUrl: 'views/indexPrivado.html',
      controller: 'indexPrivado'
    })
    /*.when('/scordValue', {
      templateUrl: 'views/scordvalue.html',
      controller: 'MainCtrl'
    })*/
    .otherwise({
      redirectTo: '/indexPrivado'
    });
});
