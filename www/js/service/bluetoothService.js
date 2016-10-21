/**
 * Created by junyoung on 2016-06-09.
 */
angular.module('hangeulbotApp')
.factory('bluetoothService',function($q,$cordovaBluetoothSerial,APIService){
  var bluetoothStatus = 'enabled';

  // 블루투스가 사용가능할 때는 enabled , 아닐때는 disabled 를 반환하면서 아닐때는 허용을 요청한다.
  var isEnabled = function(){

  };

  var enable = function(){
    var q = $q.defer();
    var promise = $cordovaBluetoothSerial.enable();
    promise.then(function(){
      console.log('승낙했다.');
      q.resolve('enabled');
    },function(){
      console.log('거부했다..');
      q.reject('disabled');
    })
    return q.promise;
  };



  var discoverPairedDevices = function(){
    var q = $q.defer();
    var promise = $cordovaBluetoothSerial.list();
    var devices=[] ;
    var count = 0;
    promise.then(function(data){
      if(data.length!=0){
        data.forEach(function(device){
          console.log('데이터의 길이는 ?'+data.length);
          APIService.isHangeulbotDeivce(device.id).then(function(flag){
            console.log('페어드 된적 있음! 기기정보 : '+ device.name + device.id+" 한글봇이냐 ? "+flag);
            if(flag){
              devices.push(device);
              console.log('현재 한글 봇 한대 있음');
            }

            if(count==data.length-1){
              console.log('현재 카운트'+count);
              q.resolve(devices);
            }
            count++;
          });
        })
      }else{
        q.resolve(devices);
      }


    },function(error){
      q.reject(error);
    })
    return q.promise;
  }

  var discoverUnpairedDevices = function(){
    var q = $q.defer();
    var promise1 = $cordovaBluetoothSerial.discoverUnpaired();
    var devices=[] ;
    promise1.then(function(data){
      data.forEach(function(device){
        if(APIService.isHangeulbotDeivce(device.id)){
          devices.push(device);
          console.log('현재 한글 봇 한대 있음');
        }

      })
      q.resolve(devices);
    },function(error){
      q.reject(error);
    })
    return q.promise;
  }

  var subscribe = function(){
    var q = $q.defer();
    var promise1 =  $cordovaBluetoothSerial.subscribe('@');
    promise1.then(function(data){
      console.log('resolve subscribe'+data);
      q.resolve(data);
    },function(error) {
      q.reject(error);
    },function(value){
      console.log('notify subscribe'+value);
      console.log(value);
      q.notify(value);
    });
    return q.promise;
  }



  var checkConnectionStatus = function(){
    var q = $q.defer();
    var promise1 = $cordovaBluetoothSerial.isConnected();

    promise1.then(function(){
      console.log("블루투스 연결성태 체크 굿!");
      q.resolve(true);
    },function(){
      console.log("블루투스 연결성태 체크 끊김!");
      q.reject(false);
    })
    return q.promise;
  }


  var setBluetoothStatus = function(bluetoothStatus){
    this.bluetoothStatus = bluetoothStatus;
  }
  var getBluetoothStatus = function(){
    return bluetoothStatus;
  }
  var onData = function(data) { // data received from Arduino
    console.log("연결됨"+data);
  }
  var onError = function(reason) {
    alert("ERROR: " + reason); // real apps should use notification.alert
  }
  return {
    isEnabled: isEnabled,
    enable: enable,
    discoverPairedDevices : discoverPairedDevices,
    discoverUnpairedDevices : discoverUnpairedDevices,
    //connect : connect,
    setBluetoothStatus : setBluetoothStatus,
    getBluetoothStatus : getBluetoothStatus,
    subscribe : subscribe ,
    checkConnectionStatus : checkConnectionStatus,
    onData : onData,
    onError : onError

  }

})
