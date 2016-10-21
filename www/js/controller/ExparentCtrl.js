/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')

.controller('parentCtrl',function($scope,$ionicLoading,bluetoothService,$ionicPopup,$ionicPlatform,$cordovaNativeAudio,SoundService){

  //디바이스의 블루투스 연결상태를 기록한다
  $scope.connectionStatus = {
    isConnected : false
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

  $ionicPlatform.ready(function(){
    //$cordovaNativeAudio.preloadSimple('touchMusic','effect/touchEffect.mp3');
  })

  $scope.readyMusic = function(){
    console.log('레디뮤직은 하냐');
    //터치음 삽입
    //SoundService.prototype.localPreloadComplex('touchMusic','effect/touchEffect.mp3',1,1,0);
    //배경음 삽입
    //SoundService.prototype.localPreloadComplex('defaultBgm','effect/bgm.mp3',1,1,0,$scope.playDefaultMusic());
  }

  $scope.playDefaultMusic = function(){
    setTimeout(function(){
      //SoundService.prototype.localMusicLoop('defaultBgm');
    },2000);
  }

  //어디든 클릭하면 소리가 난다
  $scope.playTouchSound = function(){
    
      console.log('소리로 오냐')
      //SoundService.prototype.localMusicPlay('touchMusic');

  }
})
