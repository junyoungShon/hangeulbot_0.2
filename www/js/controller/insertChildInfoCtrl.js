/**
 * Created by jyson on 2016. 7. 11..
 */
angular.module('hangeulbotApp')

.controller('insertChildInfoCtrl',function($scope, ionicDatePicker, $ionicPlatform, $ionicActionSheet,
                                           ProfileService,HangeulbotUser,$ionicHistory,AuthService,
                                           API_ENDPOINT,$cordovaFileTransfer,hangeulbotUtil,Device,$state){

    $ionicPlatform.ready(function(){

      $scope.hangeulbotUser = HangeulbotUser.getHangeulbotUser();
      $scope.insertInfoHeight = Device.prototype.getDeviceHeight()-20;
      $scope.childInfo = {
        childId:'',
        childBirth:'',
        childExp:0,
        childIdx:'',
        childName:'',
        childNum:'',
        childPhoto:'',
        userId:HangeulbotUser.getHangeulbotUser().userId
      };
      $scope.profileImageUrl = "img/profile/icon_photo_info.png";
      console.log('유저정보넘어온거 확인해볼까 ?',HangeulbotUser);
      try{
        $scope.childInfo.childNum = HangeulbotUser.hangeulbotUser.hangeulbotChildren.length;
      }catch(e){
        $scope.childInfo.childNum = 0;
      }
    })

    $scope.userInfo = HangeulbotUser.getHangeulbotUser();


    //$scope.headerHeight = document.getElementById("headerHeight").offsetHeight;
    //$scope.profileImgSize = (document.getElementById("deviceHeight").offsetWidth)/5;

    $scope.years = [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016];
    $scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];

    $scope.childNameInvalidator = function(){
      var insertedName = $scope.childInfo.childName;
      var nameLength = insertedName.length;
      console.error(insertedName+" : 길이 - "+ insertedName.length);
      if(nameLength>10){
        $scope.childInfo.childName = insertedName.substring(0,10);
      }
    };

    $scope.cancel = function () {
      screen.lockOrientation('landscape');
      $ionicHistory.goBack();
    };

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log(val+new Date(val))
        $scope.childInfo.childBirth = new Date(val).format("yyyy-MM-dd")

      }
    };
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.selectOption = function() {
        console.error('이건 두번오냐');
        //screen.lockOrientation('portrait');
        $scope.hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: '<i class="icon ion-image assertive"></i>갤러리에서 사진 선택하기' }
          ],
          titleText: '<i class="ion-plus-circled assertive photoUploadTitle"></i><span class="photoUploadTitleText">사진추가</span>',
          cancelText: '<i class="ion-ios-close-empty photoUploadCancel"></i><span class="photoUploadTitleText">취소</span>',
          cancel: function(){
            screen.lockOrientation('landscape');
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          },
          buttonClicked: function() {
            $scope.addImage(1);
          }
        });
    }

    $scope.addImage = function(type) {
        $scope.hideSheet();
        ProfileService.handleMediaDialog(type,$scope.childInfo.childNum).then(function(newPath) {
          screen.lockOrientation('landscape');
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          console.log('여기오니');
          $scope.profileImageUrl = newPath;
          $scope.childInfo.childPhoto = newPath;
        });
    }


  $scope.childBirthChanger = function(){
    var unit = unit;
    var when = when;

    $scope.childInfo.childBirth = $scope.childYear+'-'+$scope.childMonth +'-'+$scope.childDay;
    console.log('아이 생일'+$scope.childInfo.childBirth);
  }

  $scope.submitChildInfo = function (childInfo) {
    console.log('여기옵니까')
    if($scope.childInfo.childName!=''&&$scope.childInfo.childBirth!=''&&childInfo.childGender!=''){
      console.log('유효합니까?'+$scope.childInfo.childBirth);
      $scope.childInfo.childBirth = Date.parse($scope.childInfo.childBirth);
      $scope.insertChildInfo($scope.childInfo);
    }else{
      $scope.alertStatement = "누락된 사항이 있습니다! 확인해주세요!";
    }
  };

  $scope.insertChildInfo = function(insertedChildInfo){
    console.log("아이정보를 전송합니다",insertedChildInfo)
    AuthService.insertChildInfo(insertedChildInfo).then(function(){
      if(insertedChildInfo.childPhoto!=''){
        $scope.uploadImage(insertedChildInfo.childPhoto);
      }

      setTimeout(
        function(){
          HangeulbotUser.loginByUserId().then(function(data){
            hangeulbotUtil.loadingModal(false,'한글봇에접속이 완료되었습니다!');
            //유저정보 삽입
            HangeulbotUser.setHangeulbotUser(data.hangeulbotUser);
            //로그인 토큰 저장
            AuthService.storeUserCredentials(data.token);
            //아이 있는지 여부
            HangeulbotUser.childRegistered = data.childRegistered;
            $state.go('selectChild');

          },function(error){

        })
      },1000);

    },function(err){

    });

  }
  $scope.uploadImage = function(imageUrl){
    console.log("아이사진을 전송합니다")
    // Destination URL
    var url = API_ENDPOINT.url+'/childImage';
    //File for Upload
    var targetPath = imageUrl;
    // File name only
    var filename = targetPath.substr(targetPath.lastIndexOf('/')+1);
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
    };
    options.headers = {
      Connection: "close"
    }
    options.chunkedMode = false;
    console.error("업로드데이터 :" , options);

    $cordovaFileTransfer.upload(encodeURI(url),targetPath, options).then(function (result) {
      console.error("SUCCESS: " + JSON.stringify(result.response));
    }, function (err) {
      console.error("ERROR: " + JSON.stringify(err));
    }, function (progress) {
      // PROGRESS HANDLING GOES HERE
    });
  }



})
