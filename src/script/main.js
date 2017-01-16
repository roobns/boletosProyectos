(function() {
  window.$ = window.jQuery = require('jquery');
  require('underscore');
  require('bootstrap');
  var angular = require('angular');
  require('angular-route');
  require('./app');

  document.addEventListener('DOMContentLoaded', onDOMLoad);
  angular.bootstrap(document, ['recordApp']);

  function onDOMLoad() {

  };

}());
