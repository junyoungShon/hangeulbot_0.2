/**
 * Created by jyson on 2016. 7. 7..
 */
<!-- Your application bootstrap  -->
angular.module('hangeulbotApp')
.controller('insertInfoCtrl',function($scope,$state,UserInfo,HangeulbotDevice,AuthService){
  $scope.regex = {
    emailRegex : '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
    phoneRegex : '^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$',
    passwordRegex : '^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z]).*$'
  }



  $scope.userInfo = {
      userId:'',
      password:'',
      phoneNumber:'',
      isAgreed:false
  }

  $scope.insertUserInfo =  function(){
    $scope.errorMsg = '';
    UserInfo.userInfo=$scope.userInfo;

    AuthService.register(UserInfo.userInfo,HangeulbotDevice.deviceStatus).then(function(){
      console.log('안오잖앙여ㅕ기')
      $state.go('insertChildInfo');
    },function(errMsg){

    });
    //if(){}



    /*
     var jsonData = JSON.stringify(userInfo);
     AuthService.register(jsonData).then(function(msg) {
     $state.go('inside.dashboard');
     }, function(errMsg) {
     var alertPopup = $ionicPopup.alert({
     title: '회원가입 실패!',
     template: errMsg
     });
     });
     */

  }




});
