/**
 * Created by jyson on 2016. 10. 23..
 */
angular.module('hangeulbotApp')
.factory('BLE', function($q) {

  var connected;

  return {

    devices: [],
    isEnabled : function(){
      var deferred = $q.defer();
      ble.isEnabled(function(){
        deferred.resolve(true);
      },function(){
        deferred.reject(false);
      })
      return deferred.promise;
    },
    enable : function(){
      var deferred = $q.defer();
      ble.enable(function(){
        deferred.resolve(true);
      },function(){
        deferred.reject(false);
      })
      return deferred.promise;
    },

    scan: function() {
      var that = this;
      var deferred = $q.defer();

      that.devices.length = 0;

      // disconnect the connected device (hack, device should disconnect when leaving detail page)
      if (connected) {
        var id = connected.id;
        ble.disconnect(connected.id, function() {
          console.log("Disconnected " + id);
        });
        connected = null;
      }

      ble.startScan([],  /* scan for all services */
        function(peripheral){
          that.devices.push(peripheral);
          console.log("found One ",peripheral);
        },
        function(error){
          console.log("Not found One ",error);
          deferred.reject(error);
        });
      console.log("Start Scan");
      // stop scan after 20 seconds
      setTimeout(ble.stopScan, 5000,
        function() {
          deferred.resolve(that.devices);
        },
        function() {
          console.log("stopScan failed");
          deferred.reject("Error stopping scan");
        }
      );

      return deferred.promise;
    },
    connect: function(deviceId) {
      var deferred = $q.defer();

      ble.connect(deviceId,
        function(peripheral) {
          connected = peripheral;
          deferred.resolve(peripheral);
        },
        function(reason) {
          deferred.reject(reason);
        }
      );

      return deferred.promise;
    },
    startNotification : function(deviceId) {
      var deferred = $q.defer();
      console.log('Device startNotification() 실행됨'+deviceId);
      var insertedtext = '';
      ble.startNotification(deviceId,"FFF0","FFF2",
        function(data) {
          console.log('data',data);
          var adData = new Uint8Array(data);
          for(var i=0;i<adData.length;i++){
            console.log(i+ "번째 데이터",String.fromCharCode(adData[i]));
            insertedtext += String.fromCharCode(adData[i]);
          }

          console.log('완성된 단어'+insertedtext);
          if(insertedtext.charAt(0)=='!'&&insertedtext.charAt(insertedtext.length-1)=='@'){
            deferred.resolve(insertedtext);
            insertedtext = '';
            data = '';
          }

        },
        function(reason) {
          deferred.reject(reason);
        }
      );

      return deferred.promise;
    }
  };
});
