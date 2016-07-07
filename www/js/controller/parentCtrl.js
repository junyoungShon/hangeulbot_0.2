/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')

.controller('parentCtrl',function($scope,$ionicLoading,bluetoothService){




  //선택된 디바이스에 subscribe 시도한다.
  $scope.subscribe = function(){
    var subscribePromise =bluetoothService.subscribe();
    subscribePromise.then(function(data){
      console.log("subscribe"+data);
    },function(){
    })
  }







})
