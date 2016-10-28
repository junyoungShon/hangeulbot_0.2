/**
 * Created by jyson on 2016. 8. 5..
 */

angular.module('hangeulbotApp').filter('answerTruefalse', function() {
  return function(flag) {
    if(flag) {
      return "정답";
    } else {
      return "오답"
    }
  }
})
angular.module('hangeulbotApp').filter('insertedAnswerFilter', function() {
  return function(insertedAnswer) {
    if(insertedAnswer=='false') {
      return '미입력';
    } else {
      return insertedAnswer;
    }
  }
})
angular.module('hangeulbotApp').filter('finishedTruefalse', function() {
  return function(flag) {
    if(flag) {
      return "완료";
    } else {
      return "미완료"
    }
  }
})
angular.module('hangeulbotApp').filter('wordKoreanBlankFilter', function() {
  return function(originWord,index,wordLogList) {
    if(originWord!=undefined) {
      return originWord;
    } else {
      var newText;
      for(var i=0;i<wordLogList.length;i++){
        if(wordLogList[i].hangeulbotWord["@idx"] == wordLogList[index].hangeulbotWord){
          newText = wordLogList[i].hangeulbotWord.wordKorean;
          break;
        }
      }
      return newText;
    }
  }
})
angular.module('hangeulbotApp').filter('contentCategoryBlankFilter', function() {
  return function(originCategory,index,contentLogList) {
    if(originCategory!=undefined) {
      return originCategory;
    } else {
      var newCategory;
      for(var i=0;i<contentLogList.length;i++){
        if(contentLogList[i].hangeulbotContent["@idx"] == contentLogList[index].hangeulbotContent){
          newCategory = contentLogList[i].hangeulbotContent.contentCategory;
          break;
        }
      }
      return newCategory;
    }
  }
})
angular.module('hangeulbotApp').filter('contentTitleBlankFilter', function() {
  return function(originTitle,index,contentLogList) {
    if(originTitle!=undefined) {
      return originTitle;
    } else {
      var newTitle;
      for(var i=0;i<contentLogList.length;i++){
        if(contentLogList[i].hangeulbotContent["@idx"] == contentLogList[index].hangeulbotContent){
          newTitle = contentLogList[i].hangeulbotContent.contentTitle;
          break;
        }
      }
      return newTitle;
    }
  }
})
angular.module('hangeulbotApp').filter('wordGradeBlankFilter', function() {
  return function(originGrade,index,wordLogList) {
    if(originGrade!=undefined) {
      return originGrade;
    } else {
      var newGrade;
      for(var i=0;i<wordLogList.length;i++){
        if(wordLogList[i].hangeulbotWord["@idx"] == wordLogList[index].hangeulbotWord){
          newGrade = wordLogList[i].hangeulbotWord.blockMixGrade;
          break;
        }
      }
      return newGrade;
    }
  }
})
angular.module('hangeulbotApp').controller('statisticsPageCtrl', function ($scope,$ionicHistory,hangeulbotUtil,DataService,Device,APIService) {
  $scope.goBack =function(){
    console.log('백버튼 눌렀냐????????')
    $ionicHistory.goBack();
  };
  $scope.Math = window.Math;
  $scope.deviceHeight = Device.prototype.getDeviceHeight();
  $scope.deviceWidth = Device.prototype.getDeviceWidth();


  //파닉스 관련 스코프

  $scope.phoenixStat = "templates/stats/phoenixStats.html";
  $scope.phoenixBtnList = [
    {"DAUrl":"img/staticsPage/sort_entire_phoenix_off.png","AUrl":"img/staticsPage/sort_entire_phoenix_on.png","isActivated":true,"kind":""},
    {"DAUrl":"img/staticsPage/sort_cho_phoenix_off.png","AUrl":"img/staticsPage/sort_cho_phoenix_on.png","isActivated":false,"kind":"cho"},
    {"DAUrl":"img/staticsPage/sort_jung_phoenix_off.png","AUrl":"img/staticsPage/sort_jung_phoenix_on.png","isActivated":false,"kind":"jun"},
    {"DAUrl":"img/staticsPage/sort_jong_phoenix_off.png","AUrl":"img/staticsPage/sort_jong_phoenix_on.png","isActivated":false,"kind":"jon"},
  ]


  $scope.orderByKind = ""
  $scope.orderByGrade = "rate"
  $scope.phoenixSorting = function(index){
    for(var i=0;i<$scope.phoenixBtnList.length;i++){
      $scope.phoenixBtnList[i].isActivated = false;
      if(i==index){
        $scope.phoenixBtnList[i].isActivated = true;
        $scope.orderByKind =  $scope.phoenixBtnList[i].kind
      }
    }
  }
  //공통 스코프
  $scope.pencils = [
    "img/staticsPage/pencil_step01.png",
    "img/staticsPage/pencil_step02.png",
    "img/staticsPage/pencil_step03.png",
    "img/staticsPage/pencil_step04.png",
  ]
  //단어 성취도 관련 스코프

  $scope.wordAchievementStat = "templates/stats/wordAchievementStats.html";
  $scope.wordAchievementBtnList = [
    {"DAUrl":"img/staticsPage/sort_entire_phoenix_off.png","AUrl":"img/staticsPage/sort_entire_phoenix_on.png","isActivated":true,"grade":""},
    {"DAUrl":"img/staticsPage/sort_a_off.png","AUrl":"img/staticsPage/sort_a_on.png","isActivated":false,"grade":"a"},
    {"DAUrl":"img/staticsPage/sort_c_off.png","AUrl":"img/staticsPage/sort_c_on.png","isActivated":false,"grade":"c"},
    {"DAUrl":"img/staticsPage/sort_d_off.png","AUrl":"img/staticsPage/sort_d_on.png","isActivated":false,"grade":"d"},
  ]

  $scope.wordAchievementSorting = function(index){
    for(var i=0;i<$scope.wordAchievementBtnList.length;i++){
      $scope.wordAchievementBtnList[i].isActivated = false;
      if(i==index){
        $scope.wordAchievementBtnList[i].isActivated = true;
        $scope.orderByAchievementGrade =  $scope.wordAchievementBtnList[i].grade
      }
    }
  }
  $scope.orderByAchievementGrade = ""
  $scope.orderByWord = "word"


  //파닉스 초 중 종 성 비율


  $scope.rateMaker = function(){
    var best=0;
    var good=0;
    var worst=0;
    var notRecorded=0;
    var entire = $scope.phoenixList.length;
    for(var i=0;i<$scope.phoenixList.length;i++){
      if($scope.phoenixList[i].rate=='a'){
        best++;
      }else if($scope.phoenixList[i].rate=='b'){
        good++;
      }else if($scope.phoenixList[i].rate=='c'){
        worst++;
      }else{
        notRecorded++;
      }

    }
    $scope.bestRate = Math.round((best/entire)*100);
    $scope.goodRate = Math.round((good/entire)*100);
    $scope.worstRate = Math.round((worst/entire)*100);
    $scope.notRecordedRate = Math.round((notRecorded/entire)*100);
    console.log($scope.bestRate+" "+ $scope.goodRate+" "+$scope.worstRate+" "+$scope.notRecordedRate);
    best = 0;
    good = 0;
    worst = 0;
    notRecorded = 0;
    entire = $scope.wordAchievementMapList.length;
    for(var i=0;i<$scope.wordAchievementMapList.length;i++){
      if($scope.wordAchievementMapList[i].grade=='a'){
        best++;
      }else if($scope.wordAchievementMapList[i].grade=='b'){
        good++;
      }else if($scope.wordAchievementMapList[i].grade=='c'){
        worst++;
      }else{
        notRecorded++;
      }
    }
    $scope.wordAcheivementBestRate = Math.round((best/entire)*100);
    $scope.wordAcheivementGoodRate = Math.round((good/entire)*100);
    $scope.wordAcheivementWorstRate = Math.round((worst/entire)*100);
    $scope.wordAcheivementNotRecordedRate = Math.round((notRecorded/entire)*100);

  }

  $scope.loadingDashboard = function(){
    console.log('asdf')
    //$scope.loadScript(API_ENDPOINT.url + '/static/contentJS/defaultGame.js', 'text/javascript', 'utf-8')
    //챠트 스크립트 로드
    /*hangeulbotUtil.loadScript('statistics/js/chart.min.js','text/javascript','utf-8');
    hangeulbotUtil.loadScript('statistics/js/chart-data.js','text/javascript','utf-8');
    hangeulbotUtil.loadScript('statistics/js/easypiechart.js','text/javascript','utf-8');
    hangeulbotUtil.loadScript('statistics/js/easypiechart-data.js','text/javascript','utf-8');*/

    $scope.statData = DataService.getStatData();
    console.log('통계데이터',$scope.statData)
    $scope.wordLogList = $scope.statData.wordLog;
    console.log('워드 로그리스트',$scope.statData.wordLog)
    $scope.contentLogList = $scope.statData.contentLog;
    console.log('콘텐츠 로그리스트',$scope.statData.contentLog)
    $scope.phoenixList = $scope.statData.phoenixList;
    $scope.wordAchievementMapList = $scope.statData.wordAchievementMapList;
    $scope.totalStudytime =  $scope.statData.totalStudytime;
    $scope.finishedContentsNumber = $scope.statData.finishedContentsNumber;
    $scope.phoenixRoadLength = Math.floor($scope.phoenixList.length/6);
    $scope.acheivementRoadLength = Math.floor($scope.wordAchievementMapList.length/6);

    //종합 학습 능력 그래프
    $scope.abillRadarLabels =["창의력", "집중력", "어휘력", "순발력"];

    $scope.abillRadarData = [
      [65, 59, 66, 62],
      [66, 66, 60, 66]
    ];
    var thisChildAbil = $scope.abillRadarData[0];
    var anotherChildAbil = $scope.abillRadarData[1];

      //창의력이 5이상 클경우
    if(thisChildAbil[0] - anotherChildAbil[0] > 5){
      $scope.creativeStatement = "창의력 대장이네요! 한글봇은 같은 글자라도 여러가지 조합이 가능해요! 더 많은 블럭을 활용해 볼 수 있는 콘텐츠를 추천하도록 할게요";
    }else if(thisChildAbil[0] - anotherChildAbil[0] <= 5 || thisChildAbil[0] - anotherChildAbil[0] > -5) {
      //창의력이 비슷한 경우
      $scope.creativeStatement = "평균적인 창의력을 가졌어요! 한글봇은 같은 글자라도 여러가지 조합이 가능해요! 더 많은 블럭을 활용해 볼 수 있는 콘텐츠를 추천하도록 할게요";
    }else{
      //창의력이 지옥일 경우
      $scope.creativeStatement = "평균적인 창의력에 조금 미치지 못하네요. 걱정하지마세요 " +
        "한글봇은 같은 글자라도 여러가지 조합이 가능해요! 더 많은 블럭을 활용해 볼 수 있는 콘텐츠를 추천하도록 할게요. 이 시기에는 창의력이 얼마든지 자라는 시점입니다" +
        "한글봇을 꾸준히 활용하면 창의력이 좋아질 거예요";
    }

    //집중력이 5이상 클경우
    if(thisChildAbil[1] - anotherChildAbil[1] > 5){
      $scope.concentrationStatement = "집중력이 매우 높네요! 또래의 다른아이보다 단어를 조합할때 집중력이 높아요. 이 시기의 집중력은 평생을 좌우합니다." +
        "한글봇은 글씨를 직접쓸때 보다 많은 집중이 필요해서 집중력을" +
        "더욱 높일 수 있는 좋은 집중력 강화 교구입니다.";
    }else if(thisChildAbil[1] - anotherChildAbil[1] <= 5 && thisChildAbil[1] - anotherChildAbil[1] > -5){
      //집중력이 비슷한 경우
      $scope.concentrationStatement = "평균적인 집중력을 가졌어요! 한글봇은 글씨를 쓸 때 보다 더욱 많은 집중력과 끈기가 필요해요! 이 시기의 집중력은 평생을 좌우합니다." +
        " 한글봇을 꾸준히 활용하면, 집중력을 높일 수 있을 거예요. 관련된 콘텐츠를 집중적으로 추천할게요";
    }else{
      $scope.concentrationStatement = "평균적인 집중력에 조금 미치지 못하네요. 걱정하지마세요 " +
        "이 시기에는 집중력이 얼마든지 자라는 시점입니다" +
        "아이가 꾸준히 한글봇을 활용할 수 있도록 도와주시고, 어려운 단어가 나와도 꾸준히 한글봇을 활용해 집중력을 높일 수 있도록 도와주세요 " +
        "한글봇은 글씨를 직접쓰는 것 보다 더욱 많은 끈기와 집중력을 요해요. 이를 통해 집중력을 충분히 올릴 수 있습니다. 관련된 콘텐츠를 집중적으로 추천할게요";
    }

    //어휘력이 5이상 클경우
    if(thisChildAbil[2] - anotherChildAbil[2] > 5){
      $scope.vocabularyStatement = "어휘력이 매우 높네요! 또래의 다른아이에 비해 다양한 단어를 알고있어요. 단어는 학습능력의 가장 중요한 기반입니다." +
        "한글봇은 아직 아이가 모르는 다양한 단어들을 제공하고 있어요. 점점 더 어휘력이 좋아지는 아이를 보실 수 있을 거예요"
    }else if(thisChildAbil[2] - anotherChildAbil[2] <= 5 && thisChildAbil[2] - anotherChildAbil[2] > -5){

        $scope.vocabularyStatement = "평균적인 어휘력을 가졌어요! 단어는 학습능력의 가장 중요한 기반입니다! " +
        " 한글봇은 아직 아이가 모르는 다양한 단어들을 제공하고 있어요. 점점 더 어휘력이 좋아지는 아이를 보실 수 있을 거예요" +
        " 아이의 수준에 맞는 단어들을 하나하나 익힐 수 있도록 한글봇이 도와줄게요.";
    }else{
      $scope.vocabularyStatement = "평균적인 어휘력을 조금 미치지 못하네요. 걱정하지마세요 " +
        " 한글봇은 아직 아이가 모르는 다양한 단어들을 제공하고 있어요. 점점 더 어휘력이 좋아지는 아이를 보실 수 있을 거예요" +
        "아이가 꾸준히 한글봇을 활용할 수 있도록 도와주시고, 어려운 단어가 나와도 꾸준히 한글봇을 활용하도록 도와주세요 " +
        "한글봇은 글씨를 직접쓰는 것 보다 더욱 많은 시간이 필요해서 더 큰 학습효과를 얻을 수 있습니다.";
    }

    //순발력이 5이상 클경우
    if(thisChildAbil[3] - anotherChildAbil[3] > 5){
      $scope.agilityStatement = "순발력이 매우 높네요! 또래의 다른아이보다 민첩하게 블록 조합해요. 신체적으로 정신적으로 매우 빠른아이라고 보여집니다.";
    }else if(thisChildAbil[3] - anotherChildAbil[3] <= 5 && thisChildAbil[3] - anotherChildAbil[3] > -5){
      $scope.agilityStatement = "평균적인 순발력을 가졌어요! 한글봇은 아직 소근육이 덜 발달한 아이들이 소근육을 발달시키기에 좋아요!" +
        " 더 많은 블럭 조합하고 놀이를 진행하다보면 소근육이 더욱 발달하고, 정신적으로 신체적으로 민첩해질 수 있습니다. 관련된 콘텐츠를 집중적으로 추천할게요";
    }else{
      $scope.agilityStatement = "평균적인 순발력에 조금 미치지 못하네요. 걱정하지마세요 " +
        "한글봇은 아직 소근육이 덜 발달한 아이들이 소근육을 발달시키기에 좋아요! 더 많은 블럭을 활용해 볼 수 있는 콘텐츠를 추천하도록 할게요. 이 시기에는 순발력이 얼마든지 자라는 시점입니다" +
        " 더 많은 블럭 조합하고 놀이를 진행하다보면 소근육이 더욱 발달하고, 정신적으로 신체적으로 민첩해질 수 있습니다. 관련된 콘텐츠를 집중적으로 추천할게요";
    }


    //한글 학업 성취도 그래프 todo 다른 아이 비교데이터 넘어와야함
    var studyAchievement = $scope.statData.studyAchievement;
    $scope.dataStudyAchievement =[
      [studyAchievement['4'],studyAchievement['3'],studyAchievement['2'],studyAchievement['1'],studyAchievement['0']],
      [50,55,58,62,64]
    ]
    $scope.labelsStudyAchievement = ['4주 전','3주 전','2주 전','1주 전','지금'];
    $scope.seriesStudyAchievement = ['내 아이','또래아이']

    //단어 난이도 별 정답율
    var answerRateByWordGrade = $scope.statData.answerRateByWordGrade;
    var anotherAnswerRateByWordGrade = $scope.statData.anotherAnswerRateByWordGrade;
    $scope.dataAnswerRateByWordGrade =[
      [answerRateByWordGrade['1'],answerRateByWordGrade['2'],answerRateByWordGrade['3'],answerRateByWordGrade['4'],answerRateByWordGrade['5']],
      [anotherAnswerRateByWordGrade['1'],anotherAnswerRateByWordGrade['2'],anotherAnswerRateByWordGrade['3'],anotherAnswerRateByWordGrade['4'],anotherAnswerRateByWordGrade['5']]
    ]
    $scope.labelsAnswerRateByWordGrade = ['1단계','2단계','3단계','4단계','5단계'];
    $scope.seriesAnswerRateByWordGrade = ['내 아이','또래아이']

    //단어 난이도 별 정답율
    var answerRateByWordWeeks = $scope.statData.answerRateByWeeks;
    var anotherAnswerRateByWordWeeks = $scope.statData.anotherChildAnswerRateByWeeks;
    $scope.dataAnswerRateByWeeks =[
      [answerRateByWordWeeks['4'],answerRateByWordWeeks['3'],answerRateByWordWeeks['2'],answerRateByWordWeeks['1'],answerRateByWordWeeks['0']],
      [anotherAnswerRateByWordWeeks['4'],anotherAnswerRateByWordWeeks['3'],anotherAnswerRateByWordWeeks['2'],anotherAnswerRateByWordWeeks['1'],anotherAnswerRateByWordWeeks['0']]
    ]
    $scope.labelsAnswerRateByWeeks = ['4주 전','3주 전','2주 전','1주 전','현재'];
    $scope.seriesAnswerRateByWeeks = ['내 아이','또래아이']


    $scope.rateMaker();
  }

  $scope.childId="imvestt@hanmail.net_0";
  $scope.wordLogPage=1;
  $scope.contentLogPage=1;
  $scope.moreWordLog = true;
  $scope.moreContentLog = true;
  $scope.getContentLog = function(){
    $scope.contentLogPage=$scope.contentLogPage+1;
    APIService.getContentLog($scope.childId,$scope.contentLogPage).then(function(data){
      console.error('데이터길이'+data.contentLogList.length);
      if(data.contentLogList.length==0){
        $scope.moreContentLog = false;
      }else{
        for(var i=0;i<data.contentLogList.length;i++){
          $scope.contentLogList.push(data.contentLogList[i]);
        }
      }
    },function(){})
  }
  $scope.getWordLog = function(){
    $scope.wordLogPage=$scope.wordLogPage+1;
    APIService.getWordLog($scope.childId,$scope.wordLogPage).then(function(data){
      if(data.wordLogList.length==0){
        $scope.moreWordLog = false;
      }else{
        for(var i=0;i<data.wordLogList.length;i++){
          $scope.wordLogList.push(data.wordLogList[i]);
        }
      }
    },function(){})
  }

})
