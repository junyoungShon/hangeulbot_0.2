/**
 * Created by jyson on 2016. 7. 27..
 */
angular.module('hangeulbotApp')


  .controller('selectChildInfoCtrl',function($scope,$state,HangeulbotUser,hangeulbotUtil,API_ENDPOINT,HangeulbotChild,Device){
    $scope.imagePath = 'img/cardBG.jpg'

    $scope.getChildLevel = function(exp){
      console.log('이거 계산은 시도하냐 이시키야')
      var level = HangeulbotChild.getChildLevel(exp);
      console.log('그래서 레벨 몇이냐 너'+level);
      return level;
    }
    $scope.getChildInfo = function (){
      //$scope.entireChildNum =
      HangeulbotChild.hangeulbotChildren = HangeulbotUser.hangeulbotUser.hangeulbotChildren;
      HangeulbotChild.infoTypeChanger();
      $scope.childInfoList = HangeulbotChild.hangeulbotChildren;
      $scope.deviceHeight = Device.prototype.getDeviceHeight();
      $scope.deviceWidth = Device.prototype.getDeviceWidth();
      console.log('현재 아이의 숫자는'+$scope.childInfoList.length+'현재 아이의 정보는',$scope.childInfoList);
      try{
        $scope.entireChildNum = $scope.childInfoList.length;
      }catch(e){
        $scope.entireChildNum = 0;
        $scope.childInfoList = [];
      }
    }
    $scope.getChildNum = function(number){
      var flag = false;
      if($scope.entireChildNum==number){
        flag =true;
      }
      return flag;
    }

    $scope.goChildInfoForm = function(childNumber){
      console.error('여기는 오고있냐 ');
      $state.go("insertChildInfo",{childNumber:childNumber});
      //hangeulbotUtil.alertPopup('구경모드입니다','구경모드에서는 아이를 추가할 수 없습니다')
    }

    $scope.goMainContentPage = function (selectChild){
        HangeulbotUser.selectedChild =selectChild;
        HangeulbotChild.hangeulbotChild = HangeulbotUser.hangeulbotUser.hangeulbotChildren[selectChild];
        console.log('아니 제대로 애들이 들어가나?',HangeulbotChild.hangeulbotChild);
        HangeulbotChild.goMainContentPage(HangeulbotChild.hangeulbotChild).then(function(data){
          HangeulbotChild.contentList = data.contentList;
          $state.go('main');
        },function(error){});
    }
  })
