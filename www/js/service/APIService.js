/**
 * Created by jyson on 2016. 7. 29..
 */
angular.module('hangeulbotApp')

  .service('APIService', function($q, $http, API_ENDPOINT,HangeulbotUser,$state,hangeulbotUtil) {


    var getStatByChildId = function(childId){
      console.log(childId);
      return $q(function(resolve,reject){
        $http({
          
          method: 'GET', //방식
          url: API_ENDPOINT.url+'/childStats/?childId='+childId,
          dataType:'json',
        }).success(function(data, status, headers, config) {
          console.log('데이터 도착',data);
          resolve(data);
        }).error(function(data, status, headers, config) {
          reject(result.data.msg);
        });
      })
    }
    var getWordListForDefaultWordGame = function(childId,contentId){
      console.log(childId);
      return $q(function(resolve,reject){
        $http({
          method: 'GET', //방식
          url: API_ENDPOINT.url+'/wordListForDefaultWordGame/?childId='+childId+'&contentId='+contentId,
          dataType:'json',
        }).success(function(data, status, headers, config) {
          console.log('데이터 도착',data.isHangeulbotDevice+"",status,headers,config);
          resolve(data);
        }).error(function(data, status, headers, config) {
          reject(result.data.msg);
        });
      })
    }
    var submitLog = function(logObject){
      console.log('로그를 전송하기위한 데이터',logObject);
      return $q(function(resolve,reject){
        $http({
          method:'post',
          url:API_ENDPOINT.url+'/userLog',
          data:logObject
        }).success(function(data,status,headers,config){
          resolve(data);
        }).error(function(data,status,headers,config){
          reject(data);
        })
      })
    }
    /*var isHangeulbotDeivce = function(deviceAddress){
      return $q(function(resolve,reject){
        $http({
          method: 'GET', //방식
          url: API_ENDPOINT.url+'/isHangeulbotDevice/'+deviceAddress,
          dataType:'json',
        }).success(function(data, status, headers, config) {
          console.log('데이터 도착',data.isHangeulbotDevice+"",status,headers,config);
          resolve(data.isHangeulbotDevice);
        }).error(function(data, status, headers, config) {
          reject(result.data.msg);
        });
      })
    }*/
    return {
      /*login: login,
       logout: logout,*/
      getStatByChildId:getStatByChildId,
      getWordListForDefaultWordGame:getWordListForDefaultWordGame,
      submitLog:submitLog

    };
  })
