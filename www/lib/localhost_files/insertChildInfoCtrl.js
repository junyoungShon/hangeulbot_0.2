/**
 * Created by jyson on 2016. 7. 11..
 */
angular.module('hangeulbotApp')


  .controller('insertChildInfoCtrl',function($ionicPlatform,ionicDatePicker,$scope,$state,$mdDialog,$mdMedia,UserInfo,AuthService,API_ENDPOINT,$cordovaFileTransfer){
    $scope.imagePath = 'img/cardBG.jpg'
    $scope.profileImageUrl1 = 'img/defaultProfile.png';
    $scope.deviceHeight = document.getElementById('contentHeight').offsetHeight-20;

    $scope.getChildInfo = function (){
      console.log("안녕하세욥 유저정보드려욤 드려욥 ",UserInfo.userInfo);
      console.log("안녕하세욥 아이정보 드려욥 ",UserInfo.userInfo.child);
      //$scope.entireChildNum =
      $scope.childInfoList = UserInfo.userInfo.hangeulbotChildren;
      console.log("안녕하세욥 복사된 아이정보 드려욥 ",$scope.childInfoList);
      try{
        $scope.entireChildNum = $scope.childInfoList.length;
      }catch(e){
        $scope.entireChildNum = 0;
        $scope.childInfoList = [];
      }

    }
    $scope.getChildNum = function(number){
      var flag = false;
      console.log(number);
      if($scope.entireChildNum==number){
        flag =true;
        console.log(number+"일 때 " + flag);
      }
      return flag;
    }
    /*
    $scope.getChildInfo = function (){
      for()
      UserInfo.userInfo.child[0].childName
    }*/
    $scope.showChildInfoForm = function(ev) {

      $mdDialog.show({
        controller : DialogController,
        templateUrl: 'templates/childInfoForm.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: true,
        locals : {
          childNum : $scope.childInfoList.length
        }
      })
        .then(function(insertedChildInfo) {
          $scope.insertedChildInfo = insertedChildInfo;
          $scope.childInfoList.push(insertedChildInfo);
          $scope.childInfoList.$watch();
          if(insertedChildInfo.childPhoto!=''){
            $scope.uploadImage(insertedChildInfo.childPhoto);
          }
          $scope.insertChildInfo(insertedChildInfo);
          console.error('입력된 아이정보 : ',insertedChildInfo+'아이의 수'+$scope.childInfoList.length);


        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.insertChildInfo = function(insertedChildInfo){
      console.log("아이정보를 전송합니다")
      AuthService.insertChildInfo(insertedChildInfo);

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
      function DialogController($scope, $mdDialog,ionicDatePicker,  $ionicActionSheet, ProfileService,childNum) {
        $scope.childInfo = {
          userId : UserInfo.userInfo.userId,
          childNum :childNum,
          childName : '',
          childPhoto : '',
          childBirth : '',
          childExp:''
        }
        $scope.childNameInvalidator = function(){
          var insertedName = $scope.childInfo.childName;
          var nameLength = insertedName.length;
          console.error(insertedName+" : 길이 - "+ insertedName.length);
          if(nameLength>10){
            $scope.childInfo.childName = insertedName.substring(0,10);
          }
        };
        $scope.hide = function () {
          $mdDialog.hide();
        };
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
        $scope.submitChildInfo = function (childInfo) {
          if(childInfo.childName!=''&&childInfo.childBirth!=''&&childInfo.childGender!=''){
            $mdDialog.hide(childInfo);
          }else{
            $scope.alertStatement = "누락된 사항이 있습니다! 확인해주세요!";
          }
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

        $scope.addImageCount = 0;

        $scope.addMedia = function() {
          if($scope.addImageCount==0){
            console.error('이건 두번오냐');
            $scope.hideSheet = $ionicActionSheet.show({
              buttons: [
                { text: '카메라로 사진찍어 올리기' },
                { text: '갤러리에서 사진 선택하기' }
              ],
              titleText: '사진추가',
              cancelText: '취소',
              buttonClicked: function(index) {
                $scope.addImage(index);
              }
            });
            $scope.addImageCount=1;
          }else{
            $scope.addImageCount=0;
          }
        }

        $scope.addImage = function(type) {
          if($scope.addImageCount==0){
            $scope.hideSheet();
            ProfileService.handleMediaDialog(type,childNum).then(function(newPath) {
              $scope.profileImageUrl = newPath;
              $scope.childInfo.childPhoto = newPath;

            });
            $scope.addImageCount =1;
          }else{
            $scope.addImageCount = 0;
          }
        }



      }
  });
