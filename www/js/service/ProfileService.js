angular.module('hangeulbotApp')
  .factory('ProfileService', function($cordovaCamera, $q, $cordovaFile,HangeulbotUser) {


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

    function makeid() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };


    function saveMedia(type,childNum) {
      return $q(function(resolve, reject) {
        var options = optionsForType(type);
        $cordovaCamera.getPicture(options).then(function(imageUrl) {
          if(ionic.Platform.isIOS()||ionic.Platform.isIPad()){
            console.error("본래 이미지 url "+imageUrl)
            var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
            var newName = HangeulbotUser.hangeulbotUser.userId+"_"+childNum+"_"+makeid()+".jpg";
            console.error("이름 :  "+ name + " namePath : " +namePath+ " newName : " + newName+ " cordova.file.dataDirectory " + cordova.file.dataDirectory);
            $cordovaFile.copyFile(namePath,name, cordova.file.dataDirectory,newName)
              .then(function(info) {
                console.error("세이브미디어에 오냐2 코르도바파일 통과"+newName);
                resolve(cordova.file.dataDirectory+newName);
              }, function(data) {
                console.error('이브미디어에 오냐2 코르도바파일 에러',data.hasOwnProperty());
                reject();
              });

          }else{
            var name = imageUrl.substring(imageUrl.lastIndexOf('/') + 1,imageUrl.lastIndexOf('?'));
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
            var newName = HangeulbotUser.hangeulbotUser.userId+"_"+childNum+"_"+makeid()+".jpg";
            console.error("이름 :  "+ name + " namePath : " +namePath+ " newName : " + newName+ " cordova.file.dataDirectory " + cordova.file.dataDirectory);
            $cordovaFile.copyFile(namePath,name, cordova.file.dataDirectory,newName)
              .then(function(info) {
                console.error("세이브미디어에 오냐2 코르도바파일 통과"+newName);

                resolve(cordova.file.dataDirectory+newName);
              }, function(data) {
                console.error('이브미디어에 오냐2 코르도바파일 에러',data.hasOwnProperty());
                reject();
              });
          }

          //resolve(namePath+newName);

        });
      })
    }



    return {
      handleMediaDialog: saveMedia
    }
  });
