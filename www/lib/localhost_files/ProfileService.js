angular.module('hangeulbotApp')
  .factory('ProfileService', function($cordovaCamera, $q, $cordovaFile,UserInfo) {


    function optionsForType(type) {
      var source;
      switch (type) {
        case 0:
          source = Camera.PictureSourceType.CAMERA;
          break;
        case 1:
          source = Camera.PictureSourceType.PHOTOLIBRARY;
          break;
      }
      return {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: source,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 400,
        targetHeight: 400,
        saveToPhotoAlbum: false,
        correctOrientation : true
      };
    }

    function saveMedia(type,childNum) {
      return $q(function(resolve, reject) {
        var options = optionsForType(type);
        $cordovaCamera.getPicture(options).then(function(imageUrl) {
          if(ionic.Platform.isIOS()||ionic.Platform.isIPad()){
            var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
            var newName = UserInfo.userInfo.userId+"_"+childNum;
            console.error("이름 :  "+ name + " namePath : " +namePath+ " newName : " + newName+ " cordova.file.dataDirectory " + cordova.file.dataDirectory);
          }else{
            var name = imageUrl.substring(imageUrl.lastIndexOf('/') + 1,imageUrl.lastIndexOf('?'));
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
            var newName = UserInfo.userInfo.userId+"_"+childNum;
            console.error("이름 :  "+ name + " namePath : " +namePath+ " newName : " + newName+ " cordova.file.dataDirectory " + cordova.file.dataDirectory);
          }

          //resolve(namePath+newName);
          $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory,newName)
            .then(function(info) {
              console.error("세이브미디어에 오냐2 코르도바파일 통과"+newName);

              resolve(cordova.file.dataDirectory+newName);
            }, function(data) {
              console.error('이브미디어에 오냐2 코르도바파일 에러',data.hasOwnProperty());
              reject();
            });
        });
      })
    }



    return {
      handleMediaDialog: saveMedia
    }
  });
