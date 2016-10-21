/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('HangeulbotUser',function($q,$http,HangeulbotDevice,AuthService,API_ENDPOINT){

    var hangeulbotUser = {
      idx:'',
      deviceId : '',
      userId:'',
      password:'',
      phoneNumber:'',
      hangeulbotChildren : []
    }
    var selectedChild;
    var childRegistered;

    var setHangeulbotChildren = function(hangeulbotChild){
      hangeulbotUser.hangeulbotChildren.push(hangeulbotChild);
      this.hangeulbotUser.hangeulbotChildren = hangeulbotChild;
    }
    var getHangeulbotChildren = function(){
      return this.hangeulbotUser.hangeulbotChildren;
    }

    var registerChild = function(hangeulbotUserInfo){
      return $q(function(resolve, reject) {
        //deviceInfo.hangeulbotUser = userInfo;
        $http({
          method: 'PUT', //방식
          url: API_ENDPOINT.url+'/deviceInfoAndUserInfo',
          data: hangeulbotUserInfo,
          dataType:'json'
        }).success(function(data, status, headers, config) {
          console.log("HttpStatus : "+ status );
          AuthService.storeUserCredentials(data.token);
          HangeulbotUser.hangeulbotUser = data.hangeulbotUser;
          resolve(data);
        }).error(function(data, status, headers, config) {
          reject(result.data.msg);
        });
      });
    }

    var setHangeulbotUser = function(hangeulbotUser){
      this.hangeulbotUser = hangeulbotUser;
    }
    var getHangeulbotUser = function(){
      return this.hangeulbotUser;
    }

    var registerUser = function(hangeulbotUserInfo){
      return $q(function(resolve, reject) {
        $http({
          method: 'PUT', //방식
          url: API_ENDPOINT.url+'/deviceInfoAndUserInfo',
          data: hangeulbotUserInfo,
          dataType:'json'
        }).success(function(data, status, headers, config) {
          console.log("HttpStatus : "+ status );
          resolve(data);
        }).error(function(result, status, headers, config) {
          console.log("",result,status);
        });
      });
    }
    var loginByUserId = function(){
      return $q(function(resolve,reject){
        console.log('접속하고자하는 디바이스의 주소');
        $http({
          method: 'POST', //방식
          url: API_ENDPOINT.url+'/loginByUserId',
          data:HangeulbotDevice.getHangeulbotDevice(),
          dataType:'json'
        }).success(function(data, status, headers, config) {
          console.log('로그인성공',data);
          resolve(data);
        }).error(function(data, status, headers, config) {

        });
      })
    }
    return {
      hangeulbotUser : hangeulbotUser,
      childRegistered : childRegistered,
      selectedChild : selectedChild,
      setHangeulbotUser : setHangeulbotUser,
      getHangeulbotUser : getHangeulbotUser,
      registerUser : registerUser,
      loginByUserId : loginByUserId,
      setHangeulbotChildren : setHangeulbotChildren,
      getHangeulbotChild : getHangeulbotChildren,
      registerChild : registerChild
    };

  })
