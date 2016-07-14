/**
 * Created by jyson on 2016. 7. 6..
 */
angular.module('hangeulbotApp')

.service('AuthService', function($q, $http, API_ENDPOINT,UserInfo,$state,UserInfo,hangeulbotUtil) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }


  var findUserByDeviceId = function(hanguelbotDevice){
    return $q(function(resolve,reject){
      $http({
        method: 'GET', //방식
        url: API_ENDPOINT.url+'/userInfoByDeviceId/'+hanguelbotDevice.getDeviceId(),
        dataType:'json',
      }).success(function(data, status, headers, config) {
        if(data.flag=="fail"){
          $state.go('insertInfo');
        }else{
          $state.go('insertChildInfo');
          storeUserCredentials(data.token);
          UserInfo.userInfo = data.hangeulbotUser;
        }
        hangeulbotUtil.loadingModal(false,'한글봇에접속이 완료되었습니다!');

      }).error(function(data, status, headers, config) {

        reject(result.data.msg);
      });
    })
  }

  var registerCount =0;
  var register = function(userInfo,deviceInfo) {
    if(registerCount==0){
      return $q(function(resolve, reject) {
        deviceInfo.hangeulbotUser = userInfo;
        console.log("넘어갈 데이터 : " ,deviceInfo)
        $http({
          method: 'PUT', //방식
          url: API_ENDPOINT.url+'/deviceInfoAndUserInfo',
          data: deviceInfo,
          dataType:'json'
        }).success(function(data, status, headers, config) {
          console.log("HttpStatus : "+ status );

          storeUserCredentials(data.token);
          UserInfo.userInfo = data.hangeulbotUser;
          resolve(data);

        }).error(function(data, status, headers, config) {
          reject(result.data.msg);
        });
        registerCount=1;
      });
    }else{
      registerCount==0;
    }

  };



  var insertChildInfo = function(childInfo){
    return $q(function(resolve,reject){
      console.error("넘어갈 데이터 : ",childInfo.childPhoto);
      $http({
        method: 'POST', //방식
        url: API_ENDPOINT.url+'/childInfo',
        data: childInfo.childPhoto
        //dataType:'json'
      }).success(function(data, status, headers, config) {
        console.log("",data)
        resolve(data);
      }).error(function(data, status, headers, config) {
        console.error("error : ", data)
        reject("df",data);
      });
    })
  }

  /*//로그인을 담당하는 서비스
  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/api_memberLogin.do', user).then(function(result) {
        console.log(result.data.success);
        if (result.data.success) {
          console.log(result.data.token);
          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };*/

  /*var logout = function() {
    destroyUserCredentials();
  };*/

  loadUserCredentials();

  return {
    /*login: login,
    logout: logout,*/
    register: register,
    findUserByDeviceId : findUserByDeviceId,
    isAuthenticated: function() {return isAuthenticated;},
    insertChildInfo: insertChildInfo
  };
})

  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
