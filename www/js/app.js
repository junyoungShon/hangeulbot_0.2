// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('hangeulbotApp', ['ionic','ionic-datepicker','ui.router','ngCordova','ngMaterial'])
  .config(function($stateProvider, $urlRouterProvider,ionicDatePickerProvider) {

    $stateProvider
      .state('intro', {
        url: 'intro',
        templateUrl: 'templates/intro.html'
      })
      .state('insertInfo', {
        url: 'insertInfo',
        templateUrl: 'templates/insertInfo.html'
      })
      .state('insertChildInfo', {
        url: 'insertInfoChildInfo',
        templateUrl: 'templates/insertChildInfo.html'
      })

      $urlRouterProvider.otherwise('intro');

    //datepicker 설정
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: '입력',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["일", "월", "화", "수", "목", "금", "토"],
      monthsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      templateType: 'modal',

      showTodayButton: false,
      dateFormat: 'yyyy-MMMM-dd',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

  })

.run(function($ionicPlatform,$state,$rootScope,AuthService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles sdasdthis internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    //인터셉터로서의 역할을 담당한다. 비로그인 상태에서 다른 url로 접근할 경우 무조건 login 페이지로 이동시킴
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
      if (!AuthService.isAuthenticated()) {
         console.log(next.name);
         if (next.name !== 'intro' && next.name !== 'insertInfo') {
           event.preventDefault();
           $state.go('intro');
         }
       }
     });
     $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
     $rootScope.$broadcast("currenStateUpated",{
     currentState : toState.name
     })
     });
    //$state.go('intro');
    $state.go('insertChildInfo');
  });
})



