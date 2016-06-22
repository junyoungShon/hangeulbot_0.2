/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')


  .controller('indexCtrl',function($ionicPlatform,$scope,bluetoothService,$ionicPopup){
    $ionicPlatform.ready(function() {
      //현재 디바이스의 블루투스 허용상태

      //현재 디바이스 근처의 한글봇 기계들
      //$scope.aroundHangeulbotDevices = [{'id':'22:22:22:22'},{'id':'22:22:22:22'},{'id':'22:22:22:22'}];
      $scope.aroundHangeulbotDevices = [];
      console.log($scope.aroundHangeulbotDevices.length)
      $scope.enableBluetooth = function(){
        $scope.loadingModal(true,'한글봇 기기를 찾고있어요~');
        var promise = bluetoothService.isEnabled();
        //블루투스 허용되었을때
        promise.then(function(result){
          console.log(result);
          //블루투스 상태를 바꿔준다.
          $scope.$parent.isBluetoothEnabled = result;
          //자동으로 블루투스 가능 기기를 검색해줌
          $scope.discoverDevices();
          //블루투스 허용이 안되었을 때는 팝업창과 함께 블루투스 허용 팝업 무한출력
          /*
           * 이슈!
           * 1. 안드로이드 경우에는 강제 종료가 가능하므로 블루투스 허용안하면 앱을 꺼버린다.
           * 2. ios는 강제 종료가 불가능
           * 3. 따라서 ios는 어쩔 수 없이 무한 출력하는 방법을 쓴다. 안드로이드는 허용안되면 끌 수 있다.
           * 4. 둘다 허용안될 경우 허용 버튼을 만들어서 수동으로 다시 허용시도할 수 있게 해준다.
           */
        },function(reason){
          console.log(reason);
          $scope.$parent.isBluetoothEnabled = reason;
          var alertPopup = $ionicPopup.alert({
            title: '블루투스 연결실패!',
            template: '블루투스를 허용해주셔야 해요 블루투스 허용에 동의해주세요! 그렇지 않으면 앱을 이용하실 수 없어요'
          });
          //블루투스 연결안되었다는 신호를 보낸 뒤에 허용요청 다시 시도
          alertPopup.then(function(res) {
            $scope.enableBluetooth();
          });

        })
      }


      //주변의 페어링 가능한 기기를 수색하며 ,
      // 한글봇이 1대 발견되면 바로 연결
      //2대 이상이면 리스트 반환
      //0대 이면 한글봇을 못찾았다는 메시지 반환
      $scope.discoverDevices = function(){
        //주변의 페어링 가능한 한글 봇 기기를 찾는다.
        var pairedDeviceSearchPromise = bluetoothService.discoverPairedDevices();
        pairedDeviceSearchPromise.then(function(data){
          console.log('페얼드 data넘어왔다..'+data.length);
          //페어링 된적있는 한글봇이 0대이면 unpaired device를 검색하기 시작한다.
          if(data.length==0) {
            $scope.discoverUnPairedDevices();
            //페어링 된적 있있는 기기가 1개면 바로 연결 시도
          }else if(data.length==1){
            $scope.aroundHangeulbotDevices.push(data[0]);
            $scope.connect(data[0]);
            // 페어링된적 있는 기기가 주변에 2개 이상이면 리스트로 선택할 수 있게해줌
          }else if(data.length>1){
            data.forEach(function(device){
              $scope.aroundHangeulbotDevices = data;
            });
          }
          //에러 발생
        },function(err){

        })
      }

      //주변의 페어링된적 없는 기기를 수색하며 ,
      // 한글봇이 1대 발견되면 바로 연결
      //2대 이상이면 리스트 반환
      //0대 이면 한글봇을 못찾았다는 메시지 반환
      $scope.discoverUnPairedDevices = function(){
        //주변의 페어링 가능한 한글 봇 기기를 찾는다.
        var unpairedDeviceSearchPromise = bluetoothService.discoverUnpairedDevices();
        unpairedDeviceSearchPromise.then(function(data){
          console.log('ㅇ언페얼드 data넘어왔다..'+data.length);
          //한글봇 기계가 주변에 없으므로 한글봇을 찾아달라고 메시지를 보낸다.
          if(data.length==0) {

            //기기가 1개면 바로 연결 시도
          }else if(data.length==1){
            $scope.aroundHangeulbotDevices.push(data[0]);
            $scope.connect(data[0]);
            //기기가 주변에 2개 이상이면 리스트로 선택할 수 있게해줌
          }else if(data.length>1){
            data.forEach(function(device){
              $scope.aroundHangeulbotDevices = data;
            });
          }
          //에러 발생
        },function(err){

        })
      }

      //선택된 디바이스에 connect를 시도한다.
      $scope.connect = function(device){
        //블루투스 device를 매개변수로 받는다.
        console.log(device.name+"에 접속을 시도함");
        $scope.loadingModal(true,'한글봇에 접속을 시도하고있어요!');
        console.log(device.id+"에 접속을 시도함");
        var connectPromise =bluetoothService.connect(device);
        connectPromise.then(function(){
          $scope.loadingModal(false,'한글봇 접속 성공');
          console.log(device.name+"에 접속 성공");
          $scope.subscribe()
        },function(){
        })
      }
      $scope.enableBluetooth();
      console.log($scope.aroundHangeulbotDevices.length);
    });
  })
