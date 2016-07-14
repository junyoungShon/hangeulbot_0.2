/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')


  .controller('indexCtrl',function($ionicPlatform,$scope,bluetoothService,$ionicPopup,$state,HangeulbotDevice,$cordovaDevice,hangeulbotUtil,AuthService){

    $scope.initialApp = function(){
      try{

      //어플리케이션에 접속한 디바이스의 운영체제를 파악하고 그에따라 디바이스 정보를 입력해줌
      var devicePlatform = $cordovaDevice.getPlatform();
      //Todo : 버젼 처리
      var deviceVersion = $cordovaDevice.getVersion();//.replace(/[^0-9]/g,"");

      }catch(e){
        $scope.connect();
        return;
      }

      //HangeulbotDevice에 기기정보를 저장
      HangeulbotDevice.setDevicePlatform(devicePlatform.toLowerCase());

      console.log("device platform in HangeulbotDevice :"+HangeulbotDevice.getDevicePlatform() + "device Version" + deviceVersion);

      //ios일때 버젼확인
      if(devicePlatform.toLowerCase()=='ios'){
        HangeulbotDevice.setDevicePlatform('ios');
        //안드로이드 일 때 버젼확인
      }else if(devicePlatform.toLowerCase()=='android'){
        HangeulbotDevice.setDevicePlatform('android');
        console.log('device version : ' + $cordovaDevice.getVersion());
        //테스트 환경일 때 조치
      }else{
        $scope.connect();
        return;
      }
      $scope.isEnabledBluetooth();

    }

    //현재 디바이스의 블루투스 허용상태

    //현재 디바이스 근처의 한글봇 기계들
    //$scope.aroundHangeulbotDevices = [{'id':'22:22:22:22'},{'id':'22:22:22:22'},{'id':'22:22:22:22'}];
    $scope.aroundHangeulbotDevices = [];

    /*
     * isEnabledBluetooth
       1. 접속 디바이스의 블루투스 허용상태를 파악
       2. 켜져있을 켱우 기기 검색
       3. 꺼져있을 경우
           android 는 허용 enableBluetooth() 얼럿을 띄우고 / ios의 경우 켜고 다시 재탐색 버튼을 누르라고함
       4. 안드로이드 그래도 허용 안할 경우 ios와 똑같이 재탐색 버튼을 누르라고 함
     *
     */
    $scope.isEnabledBluetooth = function(){
      hangeulbotUtil.loadingModal(true,'한글봇 기기를 찾고있어요~');
      var promise = bluetoothService.isEnabled();
      //블루투스 허용되었을때
      promise.then(function(result){
        //블루투스 상태를 바꿔준다. (enabled)
        HangeulbotDevice.setIsBluetoothEnabled(result);
        //자동으로 블루투스 가능 기기를 검색해줌
        if(HangeulbotDevice.getDevicePlatform()=='android'){
          //안드로이드일 경우
          $scope.discoverDevices();
        }else if(HangeulbotDevice.getDevicePlatform()=='ios'){
          //ios일 경우
          console.log('iOS 현재 블루투스 기능을 허용한 상태')
          $scope.discoverDevices();
        }else{
          //웹브라우져일 경우 - 테스트일 때 !!
          //todo 웹 브라우져 일 경우 블루투스 관련 기능을 모두 통과했다고 가정하고 다음 단계로 보내준다
        }

      },function(reason){

        //블루투스의 사용 허용을 요청 해야 함
        if(HangeulbotDevice.getDevicePlatform()=='android'){
          //안드로이드일 경우 바로 사용을 요청할 수 있다
          hangeulbotUtil.loadingModal(false,'기기의 블루투스가 꺼져있습니다');
          hangeulbotUtil.alertPopup('블루투스 연결실패','블루투스를 기능을 켜주셔야 앱을 이용하실 수 있습니다').then(function(){
            $scope.enableBluetooth();
          },function(){});;


        }else if(HangeulbotDevice.getDevicePlatform()=='ios'){
          //ios일 경우 얼럿을 띄우고 재탐색 버튼을 만들어 준다 다시 재탐색을 누르면 리스트를 실행시킴
          console.log('iOS 현재 블루투스 기능을 불허한 상태')
          hangeulbotUtil.loadingModal(false,'기기의 블루투스가 꺼져있습니다');
          hangeulbotUtil.alertPopup('기기의 블루투스 기능이 켜져 있지 않습니다','아이폰 정책상 앱에서 블루투스를 켜드릴 수 없습니다 설정에서 블루투스를 ON 하시고 재탐색 버튼을 눌러주세요!').then(function(){
            $scope.userCondition = 'bluetoothDisabled';
          },function(){})

        }else{
          //웹브라우져일 경우 - 테스트일 때 !!
        }

        console.log(reason);
        HangeulbotDevice.setIsBluetoothEnabled(reason)
      })
    }

    //안드로이드 전용 메서드 직접 블루투스 기능을 켜준다 - 허용을 안누를 경우 얼럿을 띄우며 앱을 종료시킨다
    $scope.enableBluetooth = function(){
      var promise = bluetoothService.enable();
      promise.then(function(result){
        //허용한 경우 리스트를 찾아준다.
        $scope.discoverDevices();
      },function(reason){
        //허용하지 않은 경우 - ios와 마찮가지로 얼럿을 띄우고 재탐색 버튼을 만들어 준다 다시 재탐색을 누르면 리스트를 실행시킴
        console.log('android 현재 블루투스 기능을 불허한 상태');
        hangeulbotUtil.loadingModal(false,'기기의 블루투스가 꺼져있습니다');
        hangeulbotUtil.alertPopup('기기의 블루투스 기능이 켜져있지 않습니다','블루투스기능을 활성화 하시고 재탐색 버튼을 눌러주세요').then(function(){$scope.userCondition = 'bluetoothDisabled';})
      })
    }

    //주변의 페어링 가능한 기기를 수색하며 ,
    //한글봇이 1대 발견되면 바로 연결
    //2대 이상이면 리스트 반환
    //0대 이면 한글봇을 못찾았다는 메시지 반환
    $scope.discoverDevices = function(){
      $scope.aroundHangeulbotDevices = [];
      //주변의 페어링 가능한 한글 봇 기기를 찾는다.
      var pairedDeviceSearchPromise = bluetoothService.discoverPairedDevices();
      pairedDeviceSearchPromise.then(function(data){
        //페어링 된적있는 한글봇이 0대이면 unpaired device를 검색하기 시작한다.
        if(data.length==0) {
        }else if(data.length==1){
          $scope.aroundHangeulbotDevices.push(data[0]);
        }else if(data.length>1){
          data.forEach(function(device){
            $scope.aroundHangeulbotDevices.push(device);
          });
        }

        //ios 일 경우에는 탐색을 마친다
        if(HangeulbotDevice.getDevicePlatform()=='ios'){
          $scope.finishSearchDevice();

        //android 의 경우 언페얼드 디바이스를 더 검색한다
        }else if(HangeulbotDevice.getDevicePlatform()=='android'){
          console.log()
          $scope.discoverUnPairedDevices();
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
        if(data.length==0) {
        }else if(data.length==1){
          $scope.aroundHangeulbotDevices.push(data[0]);
        }else if(data.length>1){
          data.forEach(function(device){
            $scope.aroundHangeulbotDevices.push(device);
          });
        }
        $scope.finishSearchDevice();
      },function(err){

      })
    }

    $scope.finishSearchDevice = function(){
      console.log('피니쉬로그가 찍힌닼ㄴㄴㅋㄴ')

      hangeulbotUtil.loadingModal(false,'한글봇 기기를 수색완료!')
      //에러 발생
      // 페어드된 적 있는 한글봇과 페어드된 적 없는 한글봇을 모두 수색하고 그 숫자에 따라 커넥트할 지 리스트를 보여줄 지 선택
      if($scope.aroundHangeulbotDevices.length==1){
        //바로 연결 시켜준다
        //$scope.connect($scope.aroundHangeulbotDevices[0]);
      }else if($scope.aroundHangeulbotDevices.length>=2){
        //리스트로 연결 가능한 한글봇 기계들을 보여준다
        $scope.userCondition = 'findOverTwoDevice';
      }else{
        //경고문을 출력하며 한글봇 재수색 버튼을 보여준다
        $scope.userCondition = 'findNone'
      }
    }

    //테스트용 가짜 connect
    //이 메서드 그대로 나중에 connect 완성되면 그 다음 단계가 된다
    $scope.connect = function(device){
      hangeulbotUtil.loadingModal(true,'한글봇에 접속을 시도하고있어요!')
      //디바이스 정보를 세팅해준다.
      HangeulbotDevice.setConnectionStauts("connected");
      HangeulbotDevice.setDeviceId("22:22:22:22");
      HangeulbotDevice.setDeviceName("ec-2");
      console.log("한글봇 기기정보 객체 : " , HangeulbotDevice.getDeviceStatus());
      AuthService.findUserByDeviceId(HangeulbotDevice)

    }

    //선택된 디바이스에 connect를 시도한다.
/*    $scope.connect = function(device){
      //블루투스 device를 매개변수로 받는다.
      console.log(device.name+"에 접속을 시도함");

      hangeulbotUtil.loadingModal(true,'한글봇에 접속을 시도하고있어요!')
      console.log(device.id+"에 접속을 시도함");
      var connectPromise =bluetoothService.connect(device);

      connectPromise.then(function(){

        hangeulbotUtil.loadingModal(false,'한글봇에 접속 성공!')
        console.log(device.name+"에 접속 성공");
        $scope.subscribe()
      },function(){

      })
    }*/



    $ionicPlatform.ready(function() {
      $scope.initialApp();


    })


  })
