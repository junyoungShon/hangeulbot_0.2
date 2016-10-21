// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('hangeulbotApp', ['ionic','ionic-datepicker','ui.router','ngCordova','ngMaterial','rwdImageMaps','chart.js','720kb.fx'])

  .config(function($stateProvider, $urlRouterProvider,ionicDatePickerProvider,$ionicConfigProvider,$mdGestureProvider) {
    // angularMaterial vs ionic 같이쓰니까 두번클릭됨 이걸로 일단 막을 수 있음
    $mdGestureProvider.skipClickHijack();
    $stateProvider
      .state('intro', {
        url: 'intro',
        templateUrl: 'templates/intro.html'
      })
      .state('insertInfo', {
        url: 'insertInfo',
        templateUrl: 'templates/insertInfo.html',
        controller: 'insertInfoCtrl'
      })
      .state('selectChild', {
        url: 'selectChild',
        templateUrl: 'templates/selectChild.html'
      })
      .state('insertChildInfo', {
        url: 'insertInfoChildInfo',
        templateUrl: 'templates/insertChildInfo.html'
      })
      .state('main', {
        url: 'main',
        templateUrl: 'templates/main.html'
      })
      .state('contentView',{
        cache:false,
        url:'contentView/:contentId',
        templateUrl : 'templates/contentView.html'
      })
      .state('statisticsPage', {
        url: 'statisticsPage',
        templateUrl: 'templates/statisticsPage.html'
      })
      $urlRouterProvider.otherwise('intro');


  })

.run(function($ionicPlatform,$state,$rootScope,AuthService,$cordovaSplashscreen) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles sdasdthis internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(false);
    }
    if(navigator.splashscreen) {
      $cordovaSplashscreen.hide();
    }
    if(window.StatusBar) {
      StatusBar.hide();
    }

    //$state.go('intro');
    //$state.go('contentView');
    $state.go('statisticsPage');
    //
    //$state.go('main');
    //$state.go('insertInfo')
    //$state.go('insertChildInfo');
    //$state.go('selectChild');
  });
})


