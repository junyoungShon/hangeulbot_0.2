/*
/!**
 * Created by junyoung on 2016-06-09.
 *!/

'use strict';

var bluetooth = {
  initialize: function() {
    this.bindEvents();
    this.showMainPage();
  },
  bindEvents: function() {

    var TOUCH_START = 'touchstart';
    if (window.navigator.msPointerEnabled) { // windows phone
      TOUCH_START = 'MSPointerDown';
    }
    document.addEventListener('deviceready', this.onDeviceReady, false);
    refreshButton.addEventListener(TOUCH_START, this.refreshDeviceList, false);
    enableBtBtn.addEventListener(TOUCH_START,this.enableBt,false);
    sendButton.addEventListener(TOUCH_START, this.sendData, false);
    disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
    deviceList.addEventListener('touchstart', this.connect, false);
  },
  enableBt : function(){
    console.log('try EnableBluetooth')
    bluetoothSerial.enable(
      function() {
        console.log("Bluetooth is enabled");
      },
      function() {
        console.log("The user did *not* enable Bluetooth");
      }
    );
  },
  onDeviceReady: function() {
    bluetooth.refreshDeviceList();
  },
  refreshDeviceList: function() {
    bluetoothSerial.list(bluetooth.onDeviceList, bluetooth.onError);
  },
  onDeviceList: function(devices) {
    var option;

    // remove existing devices
    deviceList.innerHTML = "";
    bluetooth.setStatus("");

    devices.forEach(function(device) {

      var listItem = document.createElement('li'),
        html = '<b>' + device.name + '</b><br/>' + device.id;

      listItem.innerHTML = html;

      if (cordova.platformId === 'windowsphone') {
        // This is a temporary hack until I get the list tap working
        var button = document.createElement('button');
        button.innerHTML = "Connect";
        button.addEventListener('click', bluetooth.connect, false);
        button.dataset = {};
        button.dataset.deviceId = device.id;
        listItem.appendChild(button);
      } else {
        listItem.dataset.deviceId = device.id;
      }
      deviceList.appendChild(listItem);
    });

    if (devices.length === 0) {

      option = document.createElement('option');
      option.innerHTML = "No Bluetooth Devices";
      deviceList.appendChild(option);

      if (cordova.platformId === "ios") { // BLE
        bluetooth.setStatus("No Bluetooth Peripherals Discovered.");
      } else { // Android or Windows Phone
        bluetooth.setStatus("Please Pair a Bluetooth Device.");
      }

    } else {
      bluetooth.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
    }

  },
  connect: function(e) {
    var onConnect = function() {
      // subscribe for incoming data
      bluetoothSerial.subscribe('\n', bluetooth.onData, bluetooth.onError);

      resultDiv.innerHTML = "";
      bluetooth.setStatus("Connected");
      bluetooth.showDetailPage();
    };

    var deviceId = e.target.dataset.deviceId;
    if (!deviceId) { // try the parent
      deviceId = e.target.parentNode.dataset.deviceId;
    }

    bluetoothSerial.connect(deviceId, onConnect, bluetooth.onError);
  },
  onData: function(data) { // data received from Arduino
    console.log(data);
    resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
    resultDiv.scrollTop = resultDiv.scrollHeight;
  },
  sendData: function(event) { // send data to Arduino

    var success = function() {
      console.log("success");
      resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
      resultDiv.scrollTop = resultDiv.scrollHeight;
    };

    var failure = function() {
      alert("Failed writing data to Bluetooth peripheral");
    };

    var data = messageInput.value;
    bluetoothSerial.write(data, success, failure);
  },
  disconnect: function(event) {
    bluetoothSerial.disconnect(bluetooth.showMainPage, bluetooth.onError);
  },
  showMainPage: function() {
    mainPage.style.display = "";
    detailPage.style.display = "none";
  },
  showDetailPage: function() {
    mainPage.style.display = "none";
    detailPage.style.display = "";
  },
  setStatus: function(message) {
    console.log(message);

    window.clearTimeout(bluetooth.statusTimeout);
    statusDiv.innerHTML = message;
    statusDiv.className = 'fadein';

    // automatically clear the status with a timer
    bluetooth.statusTimeout = setTimeout(function () {
      statusDiv.className = 'fadeout';
    }, 5000);
  },
  onError: function(reason) {
    alert("ERROR: " + reason); // real apps should use notification.alert
  }
};

*/
