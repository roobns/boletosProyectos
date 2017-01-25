'use strict';
var app = angular.module("recordApp", ["ngRoute", "ngTable","ngJsonExportExcel","angular-loading-bar"]);
require('./services');
require('./filters');
require('./directives');
require('./controllers');



app.config(function($routeProvider) {
  $routeProvider
    .when('/indexPrivado', {
      templateUrl: 'views/indexPrivado.html',
      controller: 'indexPrivado'
    }).when('/administrator', {
      templateUrl: 'views/administrator.html',
      controller: 'administratorCtrl'
    }).when('/correo', {
      templateUrl: 'views/correo.html',
      controller: 'correoCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
    /*.when('/scordValue', {
      templateUrl: 'views/scordvalue.html',
      controller: 'MainCtrl'
    })*/
    .otherwise({
      redirectTo: '/indexPrivado'
    });
});
