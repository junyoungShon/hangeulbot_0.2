/**
 * Created by junyoung on 2016-06-09.
 */
angular.module('hangeulbotApp')
.factory('bluetoothService',function($q,$cordovaBluetoothSerial){
  var bluetoothStatus = 'enabled';

  // 블루투스가 사용가능할 때는 enabled , 아닐때는 disabled 를 반환하면서 아닐때는 허용을 요청한다.
  var isEnabled = function(){
    var q = $q.defer();
    var promise = $cordovaBluetoothSerial.isEnabled();
    console.log('아이폰에서 여기오나 ?');
    promise.then(function(){
      console.log('사용가능하다.');
      q.resolve('enabled');
    },function(){
      console.log('사용 허용이 안되어있다..');
      q.reject('disabled');
    })
    return q.promise;
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
    promise.then(function(data){

      data.forEach(function(device){
        console.log('페어드 된적 있음! 기기정보 : '+ device.name + device.id);
        /*if(device.name=='KITECH_B'){*/
        //if(device.name=='KITECH_B'){

          devices.push(device);
          console.log('현재 한글 봇 한대 있음');
        //}
      })
      q.resolve(devices);
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
        console.log('페어드 된적 없음 ! 기기정보 : '+ device.name + device.id);
        /*if(device.name=='KITECH_B'){*/
        //if(device.name=='KITECH_B'){
        devices.push(device);

        //}
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
      console.log('q블루투스 서비스에서 subscribe'+data);
      q.resolve(data);
    },function(error) {
      q.reject(error);
    },function(value){
      console.log('q블루투스 서비스에서 subscribe'+value);
      console.log(value);
      q.notify(value);
    });
    return q.promise;
  }

  var connect = function(device){
    var q = $q.defer();
    var deviceId = device.id;
    var promise1 = $cordovaBluetoothSerial.connect(deviceId);
    console.log("블루투스 서비스"+deviceId);
    promise1.then(function(data){
      q.resolve(data);
    },function(error){
      q.reject(error);
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
    connect : connect,
    setBluetoothStatus : setBluetoothStatus,
    getBluetoothStatus : getBluetoothStatus,
    subscribe : subscribe ,
    onData : onData,
    onError : onError

  }

})
