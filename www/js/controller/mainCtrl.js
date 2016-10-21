/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')

  .controller('mainCtrl',function($scope,$mdSidenav,API_ENDPOINT,$state,HangeulbotChild,HangeulbotUser,Device,
                                  $ionicScrollDelegate,APIService,SoundService,DataService){
    $scope.mainInit = function(){
      //메인 진입 시 배경음 재생 (3초후)
      setTimeout(function(){
        SoundService.prototype.localMusicLoop('b1');
      },3000);
      $scope.deviceHeight = Device.prototype.getDeviceHeight();
      $scope.deviceWidth = Device.prototype.getDeviceWidth();
      $scope.hangeulbotChild = HangeulbotChild.hangeulbotChild;
      $scope.hangeulbotUser = HangeulbotUser.hangeulbotUser;
      console.error('선택된 아이',HangeulbotChild.hangeulbotChild+'스코프로보면',$scope.hangeulbotChild);
      if(HangeulbotUser.selectedChild==0){
        $scope.notSelectedChild = HangeulbotUser.hangeulbotUser.hangeulbotChildren[1]
      }else{
        $scope.notSelectedChild = HangeulbotUser.hangeulbotUser.hangeulbotChildren[0]
      }
     /* HangeulbotUser.selectedChild =selectChild;
      HangeulbotChild.hangeulbotChild = HangeulbotUser.hangeulbotUser.hangeulbotChildren[selectChild];*/
      $scope.activeContentPopup = false;

      $scope.hangeulbotContentsList = HangeulbotChild.contentList;
      /*$scope.hangeulbotContentsList =[
        {
          contentCategory: "단어놀이",
          contentId: "defaultWordCard1",
          contentIdx: 0,
          contentInst: "notNeed",
          contentLink: "notNeed",
          contentPopup: "http://192.168.0.146:8888/static/contentsResources/defaultWordCard1/images/defaultWordCard1_popup.png",
          contentThumb: "http://192.168.0.146:8888/static/contentsResources/defaultWordCard1/images/defaultWordCard1_thumb.png",
          contentTitle: "팡!팡!단어놀이"
        },
        {
          contentCategory: "단어놀이",
          contentId: "venezia2",
          contentIdx: 1,
          contentInst: "notNeed",
          contentLink: "notNeed",
          contentPopup: "http://192.168.0.146:8888/static/contentsResources/venezia2/venezia2_popup.png",
          contentThumb: "http://192.168.0.146:8888/static/contentsResources/venezia2/venezia2_thumb.png",
          contentTitle: "둥~둥~단어놀이"
        }
      ];*/
      console.log('한글봇 콘텐츠',$scope.hangeulbotContentsList);
    }

    $scope.deviceHeight = document.getElementById('contentHeight').offsetHeight-20;

    $scope.toggleRight = buildToggler('right');

    $scope.getNowScroll = function(){
      return $ionicScrollDelegate.getScrollPosition().top;
    }

    $scope.showPopup = function(index){
      console.log('쇼 팝업 실행'+index)
      $scope.activeContentPopup = true;
      $scope.selectedContentNum = index;
      console.log('쇼 팝업 실행 - 인덱스 변하냐'+$scope.selectedContentNum)

    }
    $scope.hidePopup = function(){
      $scope.activeContentPopup = false;
    }
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };


    $scope.sideBarFoldActive = false;
    $scope.changeSideBarFoldActive = function(){
      console.log('상태 변경'+$scope.sideBarFoldActive)
      if($scope.sideBarFoldActive)$scope.sideBarFoldActive=false;
      else $scope.sideBarFoldActive = true
      console.log('상태 변경'+$scope.sideBarFoldActive)
    }

    $scope.changeMainChild = function (){
      var currentChildNo = HangeulbotUser.selectedChild;

      if(currentChildNo==0)HangeulbotUser.selectedChild = 1
      else HangeulbotUser.selectedChild = 0

      HangeulbotChild.hangeulbotChild = HangeulbotUser.hangeulbotUser.hangeulbotChildren[HangeulbotUser.selectedChild];

      HangeulbotChild.goMainContentPage(HangeulbotChild.hangeulbotChild).then(function(data){
        HangeulbotChild.contentList = data.contentList;
        $state.go($state.current, {}, {reload: true});
        $scope.mainInit()
      },function(error){});
    }

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        console.log('오냐여기')
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }



       /* /!*{ category: '어휘력', contentId:"defaultWordCard1" , content: "어휘력을 키울 수 있는 낱말카드 놀이",contentImage:API_ENDPOINT.ResourceUrl+"/static/contentsMain/contentsDefault.png"},
       /!* { category: '창의력', contentId:"storyWordCard1" , content: "창의력을 키우는 이야기 낱말카드.",contentImage:API_ENDPOINT.ResourceUrl+"contentsMain/contentsDefault.png"},*!/
        { category: '인지능력', contentId:"venezia2" ,content: "인지능력을 키우는 베네치아 놀이",contentImage:API_ENDPOINT.ResourceUrl+"/static/contentsMain/contentsDefault.png"},*!/

    { category: '인지능력', contentId:"venezia2" ,content: "인지능력을 키우는 베네치아 놀이",contentImage:"img/main/content_thumb01.jpg"}
      ,
        { category: '인지능력', contentId:"storyWordCard1" ,content: "인지능력을 키우는 베네치아 놀이",contentImage:"img/main/content_thumb01.jpg"},
        { category: '인지능력', contentId:"defaultWordCard1" ,content: "인지능력을 키우는 베네치아 놀이",contentImage:"img/main/content_thumb01.jpg"},
        { category: '인지능력', contentId:"venezia2" ,content: "인지능력을 키우는 베네치아 놀이",contentImage:"img/main/content_thumb01.jpg"},
      ]*/


    $scope.selectedIndex = 0;

    $scope.goContent = function(){
      var contentId = $scope.hangeulbotContentsList[$scope.selectedContentNum].contentId
      console.log('콘텐츠 아이디가 넘어와야해!!!'+contentId);

      APIService.getWordListForDefaultWordGame($scope.hangeulbotChild.childId,contentId).then(function(data){
        DataService.setWordList(data);
      },function(){})

      $scope.hidePopup();
      $state.go("contentView",{contentId:contentId},{reload:true,inherit: false});
    }
    $scope.goStatisticsPage= function(){
      APIService.getStatByChildId($scope.hangeulbotChild.childId).then(function(data){
        DataService.setStatData(data);
        $state.go("statisticsPage");
      })
    }

    var tabs = [
        { title: '단어학습'},
        { title: '즐거운놀이'}
      ],
      selected = null,
      previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;


  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

  });
