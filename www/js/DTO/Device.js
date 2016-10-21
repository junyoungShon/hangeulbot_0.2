/**
 * Created by jyson on 2016. 9. 1..
 */
angular.module('hangeulbotApp')
  .factory('Device',function($q,$cordovaDevice,bluetoothService,$cordovaBluetoothSerial,HangeulbotDevice,$window,$rootScope,$cordovaNetwork,hangeulbotUtil){
    function Device(deviceData){
      if(deviceData){
        this.setData(deviceData);
      }
    }
    Device.prototype = {

      setData: function (deviceData) {
        angular.extend(this, deviceData);
      },
      getDeviceWidth : function(){
        return $window.innerWidth;
      },
      getDeviceHeight : function(){
        return $window.innerHeight;
      },
      getPlatform: function () {
        console.log('여긴올까 ? Device.getPlatform')
        return $cordovaDevice.getPlatform().toLowerCase();
      },
      getVersion: function () {
        return $cordovaDevice.getVersion().toLowerCase();
      },
      isOffline: function(){
        return $cordovaNetwork.isOffline();
      },

      isBluetoothEnabled: function () {
        var q = $q.defer();
        var promise = $cordovaBluetoothSerial.isEnabled();
        promise.then(function(){
          q.resolve('enabled');
        },function(){
          q.reject('disabled');
        })
        return q.promise;
      },
      connect : function(device){
        var q = $q.defer();
        var deviceId = device.id;
        console.log("",device+"  "+deviceId);
        var promise1 = $cordovaBluetoothSerial.connect(deviceId);
        promise1.then(function(data){
          console.log('success')
          q.resolve(data);
        },function(error){
          console.log('fail',error)
          q.reject(error);
        })
        return q.promise;
      },
      //3초마다 블루투스의 연결 유무를 체크
      bluetoothChecker: function () {
        var repeatBluetoothCheck = setInterval(function () {
          var bluetoothCheckPromise = bluetoothService.checkConnectionStatus();
          bluetoothCheckPromise.then(function () {
            return true;
          }, function () {
            //블루투스 끊김
            //TODO
            navigator.app.loadUrl("file:///android_asset/www/index.html");
            clearInterval(repeatBluetoothCheck);
            return false;
          })
        }, 3000);
      },
      //선택된 디바이스에 subscribe 시도한다.
      subscribe: function () {
        var subscribePromise = bluetoothService.subscribe();
        subscribePromise.then(function (data) {
          console.log("success subscribe" + data);

        }, function (error) {
          console.log("success subscribe" + error);
        },function(value){
          console.log("notify subscribe" + value);
          var insertedText = hangeulbotUtil.textAssembler(value);
          console.log("넘어온 정답 :"+insertedText);
          //될까 모르겠다...
          submitAnswer(insertedText);
        })
      },
      //이미 이전에 페어링된적 있는 한글봇 기기들을 찾는다.
      discoverPairedDevices : function(){
        var q = $q.defer();
        var promise = $cordovaBluetoothSerial.list();
        var devices=[] ;
        var count = 0;
        promise.then(function(data){

          if(data.length!=0){
            data.forEach(function(device){

              console.log('데이터의 길이는 ?'+data.length);
              HangeulbotDevice.getDeviceInfoByDeviceAddress(device.id).then(function(hangeulbotDevice){
                count++;

                if(hangeulbotDevice.isHangeulbotDevice){
                  devices.push(device);
                  console.log('현재 한글 봇 한대 있음');
                }
                if(count==data.length){
                  console.log('현재 카운트'+count);
                  q.resolve(devices);
                }
              });
            })
          }else{
            q.resolve(devices);
          }
        },function(error){
          q.reject(error);
        })
        return q.promise;
      },
      //페어링된적 없는 기기를 찾는다
      discoverUnpairedDevices : function(){
        var q = $q.defer();
        var promise1 = $cordovaBluetoothSerial.discoverUnpaired();
        var devices=[] ;
        var count = 0;
        promise1.then(function(data){
          data.forEach(function(device){

            console.log('데이터의 길이는 ?'+data.length);
            HangeulbotDevice.getDeviceInfoByDeviceAddress(device.id).then(function(hangeulbotDevice){
              count++;
              if(hangeulbotDevice.isHangeulbotDevice){
                devices.push(device);
                console.log('현재 한글 봇 한대 있음');
              }
              if(count==data.length){
                console.log('현재 카운트'+count);
                q.resolve(devices);
              }

            });
          })
        },function(error){
          q.reject(error);
        })
        return q.promise;
      }


     }

    return Device;
  })
