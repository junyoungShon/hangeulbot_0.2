/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')

.controller('parentCtrl',function($scope,$state,$ionicLoading,bluetoothService,$ionicPopup,$ionicPlatform,$cordovaNativeAudio,SoundService,Device,$rootScope,AuthService){

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
    SoundService.prototype.localPreloadComplex('touchMusic','effect/click.mp3',1,1,0);
    //배경음 삽입
    for(var i=1;i<4;i++){
      var loadingFile = 'effect/bgm/b-'+i+'.mp3';
      var loadingFileId = 'b'+i
      SoundService.prototype.localPreloadComplex(loadingFileId,loadingFile,0.1,1,0);
    }
    //정답 피드백 삽입
    for(var i=1;i<7;i++){
      var loadingFile = 'effect/feedback/f-'+i+'.mp3';
      var loadingFileId = 'f'+i
      SoundService.prototype.localPreloadComplex(loadingFileId,loadingFile,1,1,0);
    }
  }

  $scope.playDefaultMusic = function(){
    setTimeout(function(){
      console.log('왜 배경음악을 실행하지 않아??')
      SoundService.prototype.localMusicLoop('b1');
    },2000);
  }

  //어디든 클릭하면 소리가 난다
  $scope.playTouchSound = function(){
      console.log('소리로 오냐')
      SoundService.prototype.localMusicPlay('touchMusic');
  }


  $scope.deviceWidth = Device.prototype.getDeviceWidth();
  $scope.deviceHeight = Device.prototype.getDeviceHeight();
  $scope.loadingTextWidth = document.getElementById("custom-overlay-text").offsetWidth;
  $scope.loadingTrue = false;
  $scope.loadingMessage = '';
  $scope.hideLoadingPageTimeout='';
  //로딩 페이지 출력
  $scope.showLoadingPage = function(loadingMessage,msgId,flag){
    //$scope.loadingMessage = loadingMessage;
    console.error('로딩메시지 : '+loadingMessage+ ' msgId : '+msgId,' flag : '+flag)
    if(flag){
      clearTimeout($scope.hideLoadingPageTimeout);
      $scope.loadingMessage = loadingMessage;
      $scope.msgId = msgId;
      $scope.loadingTrue =true;

    }else{

      // 0 ~ 9까지 랜덤 숫자 구하기
      var randomHideTime = (Math.random() * 1500)+1000;

      if($scope.msgId==msgId){
        $scope.hideLoadingPageTimeout = setTimeout(function(){
          $scope.hideLoadingPage();
        },randomHideTime)
      }
    }
  }
  //로딩 페이지 사라짐
  $scope.hideLoadingPage = function(){
    $scope.$evalAsync(function(){
      $scope.loadingTrue =false;
    })
  }

  //인터셉터로서의 역할을 담당한다. 비로그인 상태에서 다른 url로 접근할 경우 무조건 login 페이지로 이동시킴
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
     console.log(next.name);
     if (next.name !== 'intro' && next.name !== 'insertInfo') {
         event.preventDefault();
         $state.go('intro');
     }else{

     }
    }
    $scope.showLoadingPage('페이지 이동중 입니다.','pageLocate',true);
    console.log('state 이동을 감지')
    $scope.showLoadingPage('페이지 이동중 입니다.','pageLocate',false);
  });
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.$broadcast("currenStateUpated",{

      currentState : toState.name
    });
  });

})
