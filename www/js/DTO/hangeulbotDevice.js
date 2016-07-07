/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('HangeulbotDevice',function(){

      var deviceStatus = {
        isBluetoothEnabled :  '',
        deviceId : '',
        deviceName:'',
        devicePlatform : '',
        connectionStatus : '',
      }

      var setDeviceStatus = function(deviceStatus){
        deviceStatus.deviceStatus = deviceStatus;
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

      var getDeviceName = function(){
        return deviceStatus.deviceName;
      }

      var setDeviceName = function(deviceName) {
        deviceStatus.deviceName = deviceName;
      }

      var getDevicePlatform = function(){
        return deviceStatus.devicePlatform
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
      getDeviceName : getDeviceName,
      setDeviceName : setDeviceName,
      getDevicePlatform : getDevicePlatform,
      setDevicePlatform : setDevicePlatform,
      getConnectionStauts : getConnectionStauts,
      setConnectionStauts : setConnectionStauts
    }

  })
