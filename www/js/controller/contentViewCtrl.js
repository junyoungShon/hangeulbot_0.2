/**  * Created by jyson on 2016. 7. 25..  */
angular.module('hangeulbotApp').controller('contentViewCtrl',
  function ($scope, $state, API_ENDPOINT,$sce, $ionicHistory,$cordovaNativeAudio,$cordovaMedia,$ionicPlatform,$stateParams,hangeulbotUtil,SoundService,DataService,Device,HangeulbotChild,APIService) {

    $scope.wantToReplay = function(flag){
      $ionicHistory.clearCache();
      if(flag){
        $state.go("contentView",{contentId:$scope.contentId},{reload:true,inherit: false});
      }else{
        $state.go('main');
      }
    }

  //출제될 어휘리스트를 외부 자바스크립트로 전달해주는 함수
  $scope.getQuestionList = function(){
    console.log('getQuestionList',DataService.getWordList());
    return DataService.getWordList();
  }

  $scope.finishShow =false;
  /*$scope.deviceHeight = document.getElementById('contentHeight').offsetHeight;
  $scope.deviceWidth = document.getElementById('contentDIV').offsetWidth;*/
  $scope.deviceHeight = Device.prototype.getDeviceHeight();
  $scope.deviceWidth = Device.prototype.getDeviceWidth();
  $scope.cotentProgress = 0;
  $scope.contentId = $stateParams.contentId;
  $scope.contentStatusBarColor = '#e4e54a';
  $scope.finishStar = "img/contentView/play_finish_img_star0.png";
  //정답시 이벤트
    //정답 아이디 , 입력한 정답 , 정답 여부 , 끝낸 시간, 시작 시간 , 소요시간
  $scope.isConRight = function(wordId,insertedAnswer,isCorrect,guideShown,endDate,startDate,timeRequired,isTest){
    var logObject =


    {
      logType : 'userWordLog',
      wordId: wordId,
      insertedAnswer : insertedAnswer,
      isCorrect : isCorrect,
      guideShown : guideShown,
      endDate : endDate,
      startDate : startDate,
      timeRequired:timeRequired,
      contentId:$scope.contentId,
      childId:HangeulbotChild.hangeulbotChild.childId,
      isTest:isTest
    }
    console.log('logObject',logObject);
    $scope.submitLog(logObject);
  }
  //오답시 이벤트
  $scope.isConWrong = function(wordId,insertedAnswer,isCorrect,guideShown,endDate,startDate,timeRequired,isTest){
    var logObject =
    {
      logType : 'userWordLog',
      wordId: wordId,
      insertedAnswer : insertedAnswer,
      isCorrect : isCorrect,
      guideShown : guideShown,
      endDate : endDate,
      startDate : startDate,
      timeRequired:timeRequired,
      contentId:$scope.contentId,
      childId:HangeulbotChild.hangeulbotChild.childId,
      isTest:isTest
    }
    console.log('logObject',logObject);
    $scope.submitLog(logObject);

  }
  //콘텐츠 시작 시 이벤트
  $scope.startContent = function(startDate){
    var logObject =
    {
      logType : 'userContentLog',
      startDate:startDate,
      contentId:$scope.contentId,
      childId:HangeulbotChild.hangeulbotChild.childId,
      isFinished:false
    }
    $scope.submitLog(logObject);
  }
  // 단어 읽어주는 메서드
  $scope.playWordSound = function(koreanWord){
    console.log('넘어오는 한국말'+koreanWord)

     /*for(var i=0;i<koreanWord.length;i++){

       if(i!=koreanWord.length-1){
        SoundService.prototype.localPreloadSimple('koreanWord'+i,'effect/koreanSound/'+soundName);
       }else{
         SoundService.prototype.localPreloadSimple('koreanWord'+i,'effect/koreanSound/'+soundName,function(){
           console.log('재생한다...'+koreanWord.length)

         });
       }
       console.log('작성된 파일명 '+soundName+'경로'+'effect/koreanSound/'+soundName+'아이디'+'koreanWord'+i);
     }*/
    if(koreanWord.length == 1){
      console.log('한글자 재생한다...')
      var soundName0 = hangeulbotUtil.hangulToSoundName(koreanWord[0]);
      SoundService.prototype.localPreloadSimple('koreanWord0','effect/koreanSound/'+soundName0,function(){
        SoundService.prototype.localMusicPlay('koreanWord0',function(){
          SoundService.prototype.localMusicUnload('koreanWord0');
        });
      })

    }else if(koreanWord.length ==2){
      console.log('두글자 재생한다...')
      var soundName0 = hangeulbotUtil.hangulToSoundName(koreanWord[0]);
      var soundName1 = hangeulbotUtil.hangulToSoundName(koreanWord[1]);
      SoundService.prototype.localPreloadSimple('koreanWord0','effect/koreanSound/'+soundName0,function(){
        SoundService.prototype.localPreloadSimple('koreanWord1','effect/koreanSound/'+soundName1,function(){
          SoundService.prototype.localMusicPlay('koreanWord0',function(){
            SoundService.prototype.localMusicPlay('koreanWord1',function(){
              SoundService.prototype.localMusicUnload('koreanWord0');
              SoundService.prototype.localMusicUnload('koreanWord1');
            });
          });
        });
      });

    }else if(koreanWord.length ==3){
      console.log('세글자 재생한다...')
      var soundName0 = hangeulbotUtil.hangulToSoundName(koreanWord[0]);
      var soundName1 = hangeulbotUtil.hangulToSoundName(koreanWord[1]);
      var soundName2 = hangeulbotUtil.hangulToSoundName(koreanWord[2]);

      SoundService.prototype.localPreloadSimple('koreanWord0','effect/koreanSound/'+soundName0,function(){
        SoundService.prototype.localPreloadSimple('koreanWord1','effect/koreanSound/'+soundName1,function(){
          SoundService.prototype.localPreloadSimple('koreanWord2','effect/koreanSound/'+soundName2,function(){
            SoundService.prototype.localMusicPlay('koreanWord0',function(){
              SoundService.prototype.localMusicPlay('koreanWord1',function(){
                SoundService.prototype.localMusicPlay('koreanWord2',function(){
                  SoundService.prototype.localMusicUnload('koreanWord0');
                  SoundService.prototype.localMusicUnload('koreanWord1');
                  SoundService.prototype.localMusicUnload('koreanWord2');
                })
              });
            });
          });
        });
      });

    }

  }
  //콘텐츠 종료 시 이벤트
  $scope.finishContent = function(startDate,endDate,timeRequired,point,finished){
    var logObject =
    {
      logType : 'userContentLog',
      startDate:startDate,
      endDate:endDate,
      timeRequired:timeRequired,
      contentId:$scope.contentId,
      childId:HangeulbotChild.hangeulbotChild.childId,
      finished:finished,
      point:point
    }
    $scope.submitLog(logObject);
    $scope.finishShow = true;
    console.log('피니쉬드 제대로 조정되나'+$scope.finishShow+'점수 몇 점 오냐'+logObject.point);
    for(var i=0;i<(Math.floor(point/33));i++){
      var cnt=0;
      setTimeout(function(){
        cnt++;
        $scope.changeStarImage(cnt);
      },500*i);
    }
  }
  //로그 기록 전송
  $scope.submitLog = function(logObject){
    APIService.submitLog(logObject);
  }
  $scope.playFeedback = function(isCorrect){
    if(isCorrect=='right'){
      var fbNum = Math.floor(Math.random()*5)+2;
      var id = 'f'+fbNum+'';
      console.log(id);
      SoundService.prototype.localMusicPlay(id);
    }else{
      SoundService.prototype.localMusicPlay('f1');
    }

  }
  $scope.exitGame = function () {
    $ionicHistory.clearCache();
    finishContent();
    SoundService.prototype.localMusicStop('b2');
    SoundService.prototype.localMusicPlay('b1');

  }

    $scope.contentLoad= function(){
      $scope.isGameengine = false;

      //$ionicHistory.clearCache();
      //hangeulbotUtil.loadScript(API_ENDPOINT.url + '/static/contentsResources/'+$scope.contentId+'/'+$scope.contentId+'.js', 'text/javascript', 'utf-8');
      hangeulbotUtil.loadScript(API_ENDPOINT.url + '/static/contentsResources/'+'remindingWord1'+'/'+'remindingWord1'+'.js', 'text/javascript', 'utf-8');
      //hangeulbotUtil.loadScript(API_ENDPOINT.url + '/static/contentsResources/'+'defaultWordCard1'+'/'+'defaultWordCard1'+'.js', 'text/javascript', 'utf-8');
      console.log('backgroudImage'+$scope.backgroudImage)
      $scope.includeUrl =  $sce.trustAsResourceUrl(API_ENDPOINT.url + '/static/contentsResources/'+'remindingWord1'+'/'+'remindingWord1'+'.html');
      $scope.changeStarImage = function(i){
        $scope.$evalAsync(function(){
          $scope.finishStar = "img/contentView/play_finish_img_star"+i+".png";
          console.log('이야 바뀐다.'+$scope.finishStar)
        })
      }
      //SoundService.prototype.localMusicStop('b1');
    };

    $scope.playBg = function(){
      SoundService.prototype.localMusicLoop('b2');
    }



    $scope.resourcesChanger = function(backgroudImage){
      console.log('실행은될까 리소시스 체인져'+backgroudImage);
      $scope.backgroudImage =backgroudImage;
    }
    $scope.functionTrigger = function(func1){
      func1();
    }

})
