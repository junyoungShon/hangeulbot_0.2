/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('HangeulbotDevice',function(){

      var deviceStatus = {
        isBluetoothEnabled :  '',
        deviceId : '',
        devicePlatform : '',
        connectionStatus : '',
      }

      var setDeviceStatus = function(deviceStatus){
        this.deviceStatus = deviceStatus;
      }

      var getDeviceStatus = function(){
          return deviceStatus;
      }

      var setIsBluetoothEnabled = function(isBluetoothEnabled) {
          deviceStatus.isBluetoothEnabled = isBluetoothEnabled;
      }

      var getIsBluetoothEnabled = function(){
        return deviceStatus.isBluetoothEnabled;
      }

      var getDeviceId = function(){
          return deviceStatus.deviceId;
      }

      var setDeviceId = function(deviceId) {
        deviceStatus.deviceId = deviceId;
      }

      var getDevicePlatform = function(){
        return deviceStatus.deviceFlatform
      }

      var setDevicePlatform = function(devicePlatform){
        deviceStatus.devicePlatform = devicePlatform;
      }

      var getConnectionStauts = function(){
        return deviceStatus.connectionStatus;
      }

      var setConnectionStauts = function(connectionStatus){
        deviceStatus.connectionStatus = connectionStatus;
      }

    return {
      deviceStatus : deviceStatus,
      setDeviceStatus : setDeviceStatus,
      getDeviceStatus : getDeviceStatus,
      setIsBluetoothEnabled : setIsBluetoothEnabled,
      getIsBluetoothEnabled : getIsBluetoothEnabled,
      getDeviceId : getDeviceId,
      setDeviceId : setDeviceId,
      getDevicePlatform : getDevicePlatform,
      setDevicePlatform : setDevicePlatform,
      getConnectionStauts : getConnectionStauts,
      setConnectionStauts : setConnectionStauts
    }

  })
