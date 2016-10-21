/**
 * Created by jyson on 2016. 7. 6..
 */
angular.module('hangeulbotApp')

.service('AuthService', function($q, $http, API_ENDPOINT,$state,hangeulbotUtil) {
  var LOCAL_TOKEN_KEY = 'hangeulbot!';
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
  var insertChildInfo = function(childInfo){
    return $q(function(resolve,reject){
      console.error("넘어갈 데이터 : ",childInfo);
      $http({
        method: 'POST', //방식
        url: API_ENDPOINT.url+'/childInfo',
        data: childInfo
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

  loadUserCredentials();

  return {
    /*login: login,
    logout: logout,*/
    isAuthenticated: function() {return isAuthenticated;},
    storeUserCredentials : storeUserCredentials,
    insertChildInfo: insertChildInfo
  };
})

  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      request: function(config) {
        if (!AUTH_EVENTS.notAuthenticated) {
          config.headers['authorization'] = authToken;
        }
        return config;
      },
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
