/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')

.controller('parentCtrl',function($scope,$ionicLoading,bluetoothService){
  $scope.isBluetoothEnabled;
  $scope.deviceStatus = {
    isBluetoothEnabled : 'enabled',
    deviceId : '',
    connectionStatus : ''
  }
  $scope.userInfo = {
    deviceId : '',
    child :
      [
        {
          childIndex : 0,
          childName :''
        },
        {
          childIndex : 1,
          childName :''
        }
      ]
  }
  //선택된 디바이스에 subscribe 시도한다.
  $scope.subscribe = function(){
    var subscribePromise =bluetoothService.subscribe();
    subscribePromise.then(function(data){
      console.log("subscribe"+data);
    },function(){
    })
  }
  $scope.loadingModal = function(showingOverlay,message){
    if(showingOverlay){
      $ionicLoading.show({
        template: /*<h2>'+'Loading'+'</h2>*/'<div><img src="img/loading0.png" alt="" width="30%"/><h4>'+message+'</h4>'+
        '<div class="progress-bar blue stripes">'+
        '<span id="progressWidth" style="width: 40%"></span>'+
        '</div></div>',
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: false,
        showDelay: 0
      })

    }else{
      setTimeout(function () {
        $scope.$apply(function () {
          $ionicLoading.show({
            template: /*<h2>'+'Loading'+'</h2>*/'<div><img src="img/loading0.png" alt="" width="30%"/><h4>'+message+'</h4>'+
            '<div class="progress-bar blue stripes">'+
            '<span id="progressWidth" style="width: 100%"></span>'+
            '</div></div>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            showDelay: 0
          })
        });
      }, 1000);
      setTimeout(function () {
        $scope.$apply(function () {
          //$ionicLoading.hide();
        });
      }, 2000);
    }
  }


})
