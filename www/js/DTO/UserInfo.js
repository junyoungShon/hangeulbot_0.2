/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('UserInfo',function(){

    var userInfo = {
      deviceId : '',
      userId:'',
      password:'',
      phoneNumber:'',
      child :
        [
          {
            childIndex : 0,
            childName :''
          },
          {
            childIndex : 1,
            childName :''
          }
        ]
    }

    var setUserInfo = function(userInfo){
      userInfo.userInfo = userInfo;
    }
    var getUserInfo = function(){
      return this.userInfo;
    }
    //
    // var setUserInfo = function(userInfo){
    //   this.userInfo =
    // }

    return {
      userInfo : userInfo,
      setUserInfo : setUserInfo,
      getUserInfo : getUserInfo
    };

  })
