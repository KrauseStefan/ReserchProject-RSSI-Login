(function(){
  'use strict';
  angular.module('testApp').directive('bluetoothDevice', bluetoothDeviceDirective);


  function bluetoothDeviceDirective(){
    return {
      templateUrl: 'template/bluetoothDevice',
    //require: '?ngModel', // get a hold of NgModelController 
      restrict: 'E',
      scope: {
        device: '='
      },
      link: function postLink(scope, iElement, iAttrs) {
          
      }
    };
  }

})();1