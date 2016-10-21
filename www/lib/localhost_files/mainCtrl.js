/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')

  .controller('mainCtrl',function($scope,$mdSidenav,API_ENDPOINT){

    $scope.deviceHeight = document.getElementById('contentHeight').offsetHeight-20;

    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
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
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }

    $scope.userInfo = {
      deviceId : '',
      userId:'',
      password:'',
      phoneNumber:'',
      selectedChild :0 ,
      child :
        [
          {
            childNum : 0,
            childName : "김똘기",
            childBirth : 2006-04-78,
            childGender:'남자',
            childPhoto : API_ENDPOINT.ResourceUrl+"childPhoto/imvestt@hanmail.net_1.jpg",
            childLevel:5,
            childExp:5000,
            nextLevelExp : 7000,
            userId:''

          },
          {
            childNum : 1,
            childName :'',
            childBirth:'',
            childGender:'',
            childPhoto:'',
            childLevel:'',
            childExp:'',
            userId:''
          }
        ]
    }

    var contents = [
        { title: 'One', content: "Tabs will become paginated if there isn't enough room for them.",contentsImage:API_ENDPOINT.ResourceUrl+"contentsMain/contentsDefault.png"},
        { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs.",contentsImage:API_ENDPOINT.ResourceUrl+"contentsMain/contentsDefault.png"},
        { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element.",contentsImage:API_ENDPOINT.ResourceUrl+"contentsMain/contentsDefault.png"},

      ],
      selected = null,
      previous = null;
    $scope.contents = contents;
    $scope.selectedIndex = 0;
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          //$log.debug("close RIGHT is done");
        });
    };
  });
