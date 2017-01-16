'use strict';

module.exports = function($scope, $filter,dataServices, callRestFactory, errorMessageHandler) {

$scope.init = function(){

};

  function DropDown(el) {
  this.dd = el;
  this.initEvents();
}
DropDown.prototype = {
  initEvents: function() {
    var obj = this;

    obj.dd.on('click', function(event) {
      $(this).toggleClass('active');
      event.stopPropagation();
    });
  }
}

$(function() {

  var dd = new DropDown($('#dd'));

  $(document).click(function() {
    // all dropdowns
    $('.wrapper-dropdown-5').removeClass('active');
  });
});

//       botones muñeco
function activeMuneco(selection) {
  $('.newmuneco li').removeClass('seleccion');
  $(selection).addClass('seleccion');
}

  $scope.init();
  };
