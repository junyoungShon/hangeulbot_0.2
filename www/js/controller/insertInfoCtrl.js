/**
 * Created by jyson on 2016. 7. 7..
 */
<!-- Your application bootstrap  -->
angular.module('hangeulbotApp')
.controller('insertInfoCtrl',function($scope,$state,HangeulbotUser,HangeulbotDevice,AuthService){
  $scope.userInfo;
  $scope.insertInfoHeight;
  $scope.initInsertInfoCtrl = function(){
    $scope.userInfo = {
      userId:'',
      password:'',
      phoneNumber:'',
      isAgreed:false,
      deviceId:HangeulbotDevice.getHangeulbotDevice().deviceId
    }
    $scope.insertInfoHeight = document.getElementById('contentHeight').offsetHeight-20
  }

  $scope.regex = {
    emailRegex : '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
    phoneRegex : '^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$',
    passwordRegex : '^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z]).*$'
  }

  $scope.changeAgree = function(flag){
    console.log('약곤에 동의합니다'+$scope.userInfo.isAgreed)
    $scope.userInfo.isAgreed = flag;
    console.log('약곤에 동의합니다'+$scope.userInfo.isAgreed)
  }

  $scope.insertUserInfo =  function(){
    $scope.errorMsg = '';
    console.error('얍얍얍');
    HangeulbotUser.registerUser($scope.userInfo).then(function(data){
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      console.log('가입 성공');
      //유저정보 삽입
      HangeulbotUser.setHangeulbotUser(data.hangeulbotUser);
      //로그인 토큰 저장
      AuthService.storeUserCredentials(data.token);
      //아이 있는지 여부
      HangeulbotUser.childRegistered = data.childRegistered;
      //현재
      $state.go('insertChildInfo');
    },function(errMsg){

    });
  }




});
