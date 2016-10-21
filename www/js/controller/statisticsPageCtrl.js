/**
 * Created by jyson on 2016. 8. 5..
 */

angular.module('hangeulbotApp').controller('statisticsPageCtrl', function ($scope,$ionicHistory,hangeulbotUtil,DataService,Device) {
  $scope.goBack =function(){
    console.log('백버튼 눌렀냐????????')
    $ionicHistory.goBack();
  };

  $scope.deviceHeight = Device.prototype.getDeviceHeight();
  $scope.deviceWidth = Device.prototype.getDeviceWidth();


  $scope.phoenixBtnList = [
    {"DAUrl":"img/staticsPage/sort_entire_phoenix_off.png","AUrl":"img/staticsPage/sort_entire_phoenix_on.png","isActivated":true},
    {"DAUrl":"img/staticsPage/sort_cho_phoenix_off.png","AUrl":"img/staticsPage/sort_cho_phoenix_on.png","isActivated":false},
    {"DAUrl":"img/staticsPage/sort_jung_phoenix_off.png","AUrl":"img/staticsPage/sort_jung_phoenix_on.png","isActivated":false},
    {"DAUrl":"img/staticsPage/sort_jong_phoenix_off.png","AUrl":"img/staticsPage/sort_jong_phoenix_on.png","isActivated":false},
  ]
  //파닉스 초 중 종 성 비율
  $scope.bestRate = 25;
  $scope.worstRate = 5;
  $scope.notRecordedRate = 20;
  $scope.goodRate = 50;
  $scope.pencils = [
    "img/staticsPage/pencil_step01.png",
    "img/staticsPage/pencil_step02.png",
    "img/staticsPage/pencil_step03.png",
    "img/staticsPage/pencil_step04.png",
  ]



  $scope.phoenixStat = "templates/stats/phoenixStats.html";

  $scope.phoenixSorting = function(index){
    for(var i=0;i<$scope.phoenixBtnList.length;i++){
      $scope.phoenixBtnList[i].isActivated = false;
      if(i==index){
        $scope.phoenixBtnList[i].isActivated = true;
      }
    }
  }

  $scope.loadingDashboard = function(){
    console.log('asdf')
    //$scope.loadScript(API_ENDPOINT.url + '/static/contentJS/defaultGame.js', 'text/javascript', 'utf-8')
    //챠트 스크립트 로드
    /*hangeulbotUtil.loadScript('statistics/js/chart.min.js','text/javascript','utf-8');
    hangeulbotUtil.loadScript('statistics/js/chart-data.js','text/javascript','utf-8');
    hangeulbotUtil.loadScript('statistics/js/easypiechart.js','text/javascript','utf-8');
    hangeulbotUtil.loadScript('statistics/js/easypiechart-data.js','text/javascript','utf-8');*/

    //$scope.statData = DataService.getStatData();
    console.log('통계데이터',$scope.statData)
    $scope.wordLogList = $scope.statData.wordLog;
    console.log('워드 로그리스트',$scope.statData.wordLog)
    $scope.contentLogList = $scope.statData.contentLog;
    console.log('콘텐츠 로그리스트',$scope.statData.contentLog)

    //종합 학습 능력 그래프
    $scope.abillRadarLabels =["창의력", "집중력", "어휘력", "인지력"];

    $scope.abillRadarData = [
      [65, 59, 90, 81],
      [28, 48, 40, 19]
    ];
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


    $scope.phoenixList = $scope.statData.phoenixList;


  }


  $scope.statData = {
    "phoenixList" : [
      {
        "text" : "ㄱ",
        "kind" : "초성",
        "rate" : "a"
      },
      {
        "text" : "ㄴ",
        "kind" : "초성",
        "rate" : "a"
      },
      {
        "text" : "ㄷ",
        "kind" : "초성",
        "rate" : "b"
      },
      {
        "text" : "ㄹ",
        "kind" : "초성",
        "rate" : "a"
      },
      {
        "text" : "ㅁ",
        "kind" : "초성",
        "rate" : "b"
      },
      {
        "text" : "ㄱ",
        "kind" : "종성",
        "rate" : "a"
      },
      {
        "text" : "ㄴ",
        "kind" : "종성",
        "rate" : "a"
      },
      {
        "text" : "ㄷ",
        "kind" : "종성",
        "rate" : "b"
      },
      {
        "text" : "ㄹ",
        "kind" : "종성",
        "rate" : "a"
      },
      {
        "text" : "ㅁ",
        "kind" : "종성",
        "rate" : "d"
      },
      {
        "text" : "ㅏ",
        "kind" : "종성",
        "rate" : "a"
      },
      {
        "text" : "ㅑ",
        "kind" : "종성",
        "rate" : "a"
      },
      {
        "text" : "ㅓ",
        "kind" : "종성",
        "rate" : "b"
      },
      {
        "text" : "ㅕ",
        "kind" : "종성",
        "rate" : "a"
      },
      {
        "text" : "ㅜ",
        "kind" : "종성",
        "rate" : "d"
      }


    ],
    "wordAchievementMap": {
      "핸드폰": "c",
      "소방차": "a",
      "나비": "c",
      "허리": "c",
      "놀이터": "c"
    },
    "totalWordNumber": 10,

    "answerRateByWordGrade": {
      "1": 0,
      "2": 0,
      "3": 0.3333,
      "4": 0.2,
      "5": 0.2105
    },
    "anotherAnswerRateByWordGrade": {
      "1": 0,
      "2": 0,
      "3": 0.3333,
      "4": 0.2,
      "5": 0.2105
    },
    "contentLog": [
      {
        "@idx": 1,
        "contentLogIdx": 137,
        "hangeulbotChild": {
          "@idx": 2,
          "childIdx": 0,
          "childId": "dha8312@gmail.com_0",
          "childName": "cdf",
          "childBirth": 1256310000000,
          "childNum": 0,
          "childExp": 0,
          "childPhoto": "/static/childPhoto/imvestt@hanmail.net_1_a5wLX.jpg",
          "childGender": 1,
          "userId": "dha8312@gmail.com"
        },
        "hangeulbotContent": {
          "@idx": 3,
          "contentIdx": 1,
          "contentId": "venezia2",
          "contentTitle": "둥~둥~단어놀이",
          "contentCategory": "단어놀이",
          "contentInst": "notNeed",
          "contentThumb": "/static/contentsResources/venezia2/venezia2_thumb.png",
          "contentPopup": "/static/contentsResources/venezia2/venezia2_popup.png",
          "contentLink": "notNeed",
          "hangeulbotWordList": []
        },
        "startDate": 1476340045000,
        "endDate": null,
        "point": 0,
        "timeRequired": 0,
        "finished": false
      },
      {
        "@idx": 4,
        "contentLogIdx": 138,
        "hangeulbotChild": 2,
        "hangeulbotContent": {
          "@idx": 5,
          "contentIdx": 0,
          "contentId": "defaultWordCard1",
          "contentTitle": "팡!팡!단어놀이",
          "contentCategory": "단어놀이",
          "contentInst": "notNeed",
          "contentThumb": "/static/contentsResources/defaultWordCard1/images/defaultWordCard1_thumb.png",
          "contentPopup": "/static/contentsResources/defaultWordCard1/images/defaultWordCard1_popup.png",
          "contentLink": "notNeed",
          "hangeulbotWordList": []
        },
        "startDate": 1476340045000,
        "endDate": 1476340155000,
        "point": 50,
        "timeRequired": 110,
        "finished": true
      },
      {
        "@idx": 6,
        "contentLogIdx": 139,
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": 1476340176000,
        "endDate": null,
        "point": 0,
        "timeRequired": 0,
        "finished": false
      },
      {
        "@idx": 7,
        "contentLogIdx": 140,
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": 1476340176000,
        "endDate": 1476340183000,
        "point": 0,
        "timeRequired": 7,
        "finished": true
      },
      {
        "@idx": 8,
        "contentLogIdx": 141,
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": 1476342632000,
        "endDate": null,
        "point": 0,
        "timeRequired": 0,
        "finished": false
      }
    ],
    "studyAchievement": {
      "0": 0,
      "1": 29.814999,
      "2": 29.814999,
      "3": 15.057,
      "4": 0
    },
    "choPhoenix": [
      {
        "ㄱ": "d"
      },
      {
        "ㄲ": "d"
      },
      {
        "ㄴ": "d"
      },
      {
        "ㄷ": "c"
      },
      {
        "ㄸ": "d"
      },
      {
        "ㄹ": "d"
      },
      {
        "ㅁ": "d"
      },
      {
        "ㅂ": "a"
      },
      {
        "ㅃ": "d"
      },
      {
        "ㅅ": "a"
      },
      {
        "ㅆ": "d"
      },
      {
        "ㅇ": "d"
      },
      {
        "ㅈ": "d"
      },
      {
        "ㅉ": "d"
      },
      {
        "ㅊ": "a"
      },
      {
        "ㅋ": "d"
      },
      {
        "ㅌ": "d"
      },
      {
        "ㅍ": "c"
      },
      {
        "ㅎ": "c"
      }
    ],
    "jongPhoenix": [
      {
        "\u0000": "d"
      },
      {
        "ㄱ": "d"
      },
      {
        "ㄲ": "d"
      },
      {
        "ㄳ": "d"
      },
      {
        "ㄴ": "c"
      },
      {
        "ㄵ": "d"
      },
      {
        "ㄶ": "d"
      },
      {
        "ㄷ": "d"
      },
      {
        "ㄹ": "d"
      },
      {
        "ㄺ": "d"
      },
      {
        "ㄻ": "d"
      },
      {
        "ㄼ": "d"
      },
      {
        "ㄽ": "d"
      },
      {
        "ㄾ": "d"
      },
      {
        "ㄿ": "d"
      },
      {
        "ㅀ": "d"
      },
      {
        "ㅁ": "d"
      },
      {
        "ㅂ": "d"
      },
      {
        "ㅄ": "d"
      },
      {
        "ㅅ": "d"
      },
      {
        "ㅆ": "d"
      },
      {
        "ㅇ": "a"
      },
      {
        "ㅈ": "d"
      },
      {
        "ㅊ": "d"
      },
      {
        "ㅋ": "d"
      },
      {
        "ㅌ": "d"
      },
      {
        "ㅍ": "d"
      },
      {
        "ㅎ": "d"
      }
    ],
    "jungPhoenix": [
      {
        "ㅏ": "a"
      },
      {
        "ㅐ": "c"
      },
      {
        "ㅑ": "d"
      },
      {
        "ㅒ": "d"
      },
      {
        "ㅓ": "d"
      },
      {
        "ㅔ": "d"
      },
      {
        "ㅕ": "d"
      },
      {
        "ㅖ": "d"
      },
      {
        "ㅗ": "c"
      },
      {
        "ㅘ": "d"
      },
      {
        "ㅙ": "d"
      },
      {
        "ㅚ": "d"
      },
      {
        "ㅛ": "d"
      },
      {
        "ㅜ": "d"
      },
      {
        "ㅝ": "d"
      },
      {
        "ㅞ": "d"
      },
      {
        "ㅟ": "d"
      },
      {
        "ㅠ": "d"
      },
      {
        "ㅡ": "c"
      },
      {
        "ㅢ": "d"
      },
      {
        "ㅣ": "d"
      }
    ],
    "answerRateByWeeks": {
      "0": 0.1837,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    "wordLog": [
      {
        "@idx": 9,
        "userWordLogIdx": 294,
        "hangeulbotWord": {
          "@idx": 10,
          "wordId": 201,
          "wordKorean": "나비",
          "wordCategory": "동물",
          "blockMixGrade": 7,
          "wordGuideUrl": "contentsResources/guide/guide201.png",
          "wordImageUrl": "contentsResources/word/word201.png"
        },
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": null,
        "endDate": 1476368982000,
        "insertedAnswer": "false",
        "guideShown": false,
        "timeRequired": 0,
        "correct": false
      },
      {
        "@idx": 11,
        "userWordLogIdx": 258,
        "hangeulbotWord": {
          "@idx": 12,
          "wordId": 112,
          "wordKorean": "잠옷",
          "wordCategory": "의류",
          "blockMixGrade": 9,
          "wordGuideUrl": "contentsResources/guide/guide112.png",
          "wordImageUrl": "contentsResources/word/word112.png"
        },
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": 1476340045000,
        "endDate": 1476340051000,
        "insertedAnswer": "잠옷",
        "guideShown": true,
        "timeRequired": 6,
        "correct": true
      },
      {
        "@idx": 13,
        "userWordLogIdx": 259,
        "hangeulbotWord": {
          "@idx": 14,
          "wordId": 154,
          "wordKorean": "그릇",
          "wordCategory": "사물",
          "blockMixGrade": 8,
          "wordGuideUrl": "contentsResources/guide/guide154.png",
          "wordImageUrl": "contentsResources/word/word154.png"
        },
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": 1476340057000,
        "endDate": 1476340064000,
        "insertedAnswer": "차돌박이",
        "guideShown": false,
        "timeRequired": 7,
        "correct": false
      },
      {
        "@idx": 15,
        "userWordLogIdx": 260,
        "hangeulbotWord": {
          "@idx": 16,
          "wordId": 119,
          "wordKorean": "운동화",
          "wordCategory": "의류",
          "blockMixGrade": 16,
          "wordGuideUrl": "contentsResources/guide/guide119.png",
          "wordImageUrl": "contentsResources/word/word119.png"
        },
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": 1476340066000,
        "endDate": 1476340082000,
        "insertedAnswer": "차돌박이",
        "guideShown": false,
        "timeRequired": 16,
        "correct": false
      },
      {
        "@idx": 17,
        "userWordLogIdx": 261,
        "hangeulbotWord": {
          "@idx": 18,
          "wordId": 205,
          "wordKorean": "여름",
          "wordCategory": "자연",
          "blockMixGrade": 11,
          "wordGuideUrl": "contentsResources/guide/guide205.png",
          "wordImageUrl": "contentsResources/word/word205.png"
        },
        "hangeulbotChild": 2,
        "hangeulbotContent": 5,
        "startDate": 1476340084000,
        "endDate": 1476340086000,
        "insertedAnswer": "여름",
        "guideShown": true,
        "timeRequired": 1,
        "correct": true
      }
    ],
    "answerRateWeek": 0.1837,
    "anotherChildAnswerRateByWeeks": {
      "0": 0.1837,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    }
  }

})
