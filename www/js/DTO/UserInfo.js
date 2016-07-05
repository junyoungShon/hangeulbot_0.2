/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('UserInfo',function(){

    var userInfo = {
      deviceId : '',
      userId:'',
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
    //
    // var setUserInfo = function(userInfo){
    //   this.userInfo =
    // }

    return userInfo;

  })
