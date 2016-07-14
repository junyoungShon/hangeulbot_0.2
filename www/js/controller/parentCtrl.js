/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')

.controller('parentCtrl',function($scope,$ionicLoading,bluetoothService,$ionicPopup){




  //선택된 디바이스에 subscribe 시도한다.
  $scope.subscribe = function(){
    var subscribePromise =bluetoothService.subscribe();
    subscribePromise.then(function(data){
      console.log("subscribe"+data);
    },function(){
    })
  }

  document.addEventListener('deviceready', function () {
    document.addEventListener('backbutton', function (event) {
      event.preventDefault();

      event.stopPropagation();

      $ionicPopup.confirm({
        title: 'System warning',
        template: 'are you sure you want to exit?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })

      console.log('hey yaaahh');
    }, false);
  }, false);



})
