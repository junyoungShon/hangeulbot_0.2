/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('HangeulbotDevice',function($http,$q,API_ENDPOINT){
    var hangeulbotDevice

    return {
      hangeulbotDevice : {
        deviceIdx:'notConnected',
        deviceId:'notConnected',
        deviceName:'notConnected',
        deviceAddress:'notConnected',
        userId:'notConnected'
      },

      setHangeulbotDevice : function(hangeulbotDevice){
        this.hangeulbotDevice = hangeulbotDevice;
      },
      getHangeulbotDevice : function(){
        return this.hangeulbotDevice;
      },

      getDeviceInfoByDeviceAddress : function(deviceAddress) {
        return $q(function(resolve,reject){
          $http({
            method: 'GET', //방식
            url: API_ENDPOINT.url+'/isHangeulbotDevice/'+deviceAddress,
            dataType:'json',
          }).success(function(data, status, headers, config) {
            console.log('데이터 도착',data.isHangeulbotDevice+"",status,headers,config);
            resolve(data);
          }).error(function(data, status, headers, config) {
            reject(data);
          })
        })
      }
    }

  })
