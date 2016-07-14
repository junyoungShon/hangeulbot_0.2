/**
 * Created by jyson on 2016. 7. 11..
 */
angular.module('hangeulbotApp')


  .controller('insertChildInfoCtrl',function($ionicPlatform,ionicDatePicker,$scope,$state,$mdDialog,$mdMedia,UserInfo){
    $scope.imagePath = 'img/cardBG.jpg'
    $scope.profileImageUrl = 'img/defaultProfile.png';
    $scope.deviceHeight = document.getElementById('contentHeight').offsetHeight-20;

    $scope.getChildInfo = function (){
      console.log("안녕하세욥 유저정보드려욤 드려욥 ",UserInfo.userInfo);
      console.log("안녕하세욥 아이정보 드려욥 ",UserInfo.userInfo.child);
      $scope.entireChildNum = UserInfo.userInfo.hangeulbotChildren.length;
      $scope.childInfoList = UserInfo.userInfo.hangeulbotChildren;
      console.log("안녕하세욥 복사된 아이정보 드려욥 ",$scope.childInfoList);
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
        fullscreen: true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });

    };
      function DialogController($scope, $mdDialog,ionicDatePicker,  $ionicPlatform,  $ionicActionSheet, ProfileService, AuthService,API_ENDPOINT,$cordovaFileTransfer) {
        $scope.childInfo = {
          userId : UserInfo.getUserInfo().userId,
          childNum :'',
          childName : '',
          childPhoto : '',
          childBirth : '',

        }
        $scope.hide = function () {
          $mdDialog.hide();
        };
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
        var ipObj1 = {
          callback: function (val) {  //Mandatory
            console.log(val+new Date(val))
            $scope.childInfo.childBirth = new Date(val).format("yyyy-MM-dd")

          }

        };
        $scope.childInfo = {
          userId : UserInfo.getUserInfo().userId
        }
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
            ProfileService.handleMediaDialog(type).then(function(newPath) {
              $scope.profileImageUrl = newPath;
              uploadImage(newPath);
            });
            $scope.addImageCount =1;
          }else{
            $scope.addImageCount = 0;
          }

        }
        var uploadImage = function(imageUrl){
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


      }
  });
