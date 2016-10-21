/**
 * Created by junyoung on 2016-06-21.
 */
angular.module('hangeulbotApp')


  .controller('indexCtrl',function($ionicPlatform,$scope,bluetoothService,$ionicPopup,$state,$cordovaDevice,
                                   hangeulbotUtil,AuthService,Device,HangeulbotDevice,HangeulbotUser){

    $scope.aroundHangeulbotDevices = [];
    $scope.devicePlatform;



    $scope.initialApp = function(){
      //인트로 처리하기
      /*setTimeout(function(){
        document.getElementById("custom-overlay").style.display = "none";
      }, 3000);*/
      setInterval(function(){
        screen.lockOrientation('landscape');
        StatusBar.hide();
      },3000);
      $scope.devicePlatform = Device.prototype.getPlatform();

      console.log('디바이스의 플랫폼은?'+$scope.devicePlatform);
      if($scope.devicePlatform=="ios"||$scope.devicePlatform=="android"){
        //$scope.isEnabledBluetooth();
        //var mockDevice = {id:'18:F6:43:A9:A8:4C'}
        //$scope.connect(mockDevice);
        //$scope.guestMode();
      }else{
        //$scope.connect();
        //$scope.guestMode();
      }
      //$scope.guestMode();
      //인터넷 체크로 어플리케이션 시작
      $scope.isOffline();
    }

    $scope.isOffline = function(){
      // 기기가 오프라인일때
      if(Device.prototype.isOffline()){
        console.log('기기가 오프라인 상태입니다.');
        hangeulbotUtil.alertPopup
        ('oneBtn','기기의 인터넷 상태를 확인해주세요','<div class="alertPlainText">기기의 인터넷 연결상태를 확인해주세요<br>인터넷을 연결하신 뒤 확인 버튼을 눌러주세요</div>','확인','',function(){$scope.isOffline()});
      }else{
        $scope.isEnabledBluetooth()
      }
    }

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
      console.log('지금 현재 디바이스 블루투스 상태를 체크합니다.')
      //hangeulbotUtil.loadingModal(true,'해당기기가 블루투스 지원여부를 확인하고있어요~',10);
      $scope.showLoadingPage('블루투스 지원여부 확인 중',false);
      var promise = Device.prototype.isBluetoothEnabled();
      //블루투스 허용되었을때
      promise.then(function(result){
        console.log('지금 현재 디바이스 블루투스 ON')
        //자동으로 블루투스 가능 기기를 검색해줌
        if($scope.devicePlatform=='android'||$scope.devicePlatform=='ios'){
          //안드로이드일 경우
          $scope.discoverDevices();
        }else{
          //웹브라우져일 경우 - 테스트일 때 !!
          //todo 웹 브라우져 일 경우 블루투스 관련 기능을 모두 통과했다고 가정하고 다음 단계로 보내준다
        }
      //블루투스 허용안되었을 때
      },function(reason){
        //블루투스의 사용 허용을 요청 해야 함
        console.log('지금 현재 디바이스 '+$scope.devicePlatform+'블루투스 off')
        if($scope.devicePlatform=='android'){
          //안드로이드일 경우 바로 사용을 요청할 수 있다
          //hangeulbotUtil.loadingModal(false,'기기의 블루투스가 꺼져있습니다',10);
          $scope.showLoadingPage('블루투스가 꺼져있어요!',false);

          $scope.enableBluetooth();
        }else if($scope.devicePlatform=='ios'){
          //ios일 경우 얼럿을 띄우고 재탐색 버튼을 만들어 준다 다시 재탐색을 누르면 리스트를 실행시킴
          console.log('iOS 현재 블루투스 기능을 불허한 상태')

          //hangeulbotUtil.loadingModal(false,'기기의 블루투스가 꺼져있습니다',10);
          $scope.showLoadingPage('블루투스가 꺼져 있어요!',false);
          hangeulbotUtil.alertPopup('oneBtn','기기의 블루투스 기능이 켜져 있지 않습니다',
            '<div class="alertPlainText">IOS 정책상 앱에서 블루투스를 켜드릴 수 없습니다.<br> 설정에서 블루투스를 ON 하시고 재탐색 버튼을 눌러주세요!</div>','확인',''
            ,function(){$scope.isOffline();$scope.userCondition = 'bluetoothDisabled';});
        }else{
          //웹브라우져일 경우 - 테스트일 때 !!
        }
      })
      console.log('블루투스 사용가능 여부 체크 완료')
    }
    //안드로이드 전용 메서드 직접 블루투스 기능을 켜준다 - 허용을 안누를 경우 얼럿을 띄우며 앱을 종료시킨다
    $scope.enableBluetooth = function(){


      hangeulbotUtil.alertPopup('oneBtn','기기의 블루투스 기능이 켜져 있지 않습니다',
        '<div class="alertPlainText">블루투스 전원 요청이 오면 허용을 눌러주세요</div>','확인',''
        ,function(){
          var promise = bluetoothService.enable();
          promise.then(function(result){
            //허용한 경우 리스트를 찾아준다.
            $scope.isEnabledBluetooth();
          },function(reason){
            //허용하지 않은 경우 - ios와 마찬가지로 얼럿을 띄우고 재탐색 버튼을 만들어 준다 다시 재탐색을 누르면 리스트를 실행시킴
            console.log('android 현재 블루투스 기능을 불허한 상태');
            $scope.isOffline();
          })
        }
      );


    }

    //주변의 페어링 가능한 기기를 수색하며 ,
    //한글봇이 1대 발견되면 바로 연결
    //2대 이상이면 리스트 반환
    //0대 이면 한글봇을 못찾았다는 메시지 반환
    $scope.discoverDevices = function(){

      //hangeulbotUtil.loadingModal(true,'한글봇을 찾고있어요',10);
      $scope.showLoadingPage('한글봇을 찾고있어요~');

      //주변의 페어링 가능한 한글 봇 기기를 찾는다.
      var pairedDeviceSearchPromise = Device.prototype.discoverPairedDevices();
      pairedDeviceSearchPromise.then(function(devices){
        //페어링 된적있는 한글봇이 0대이면 unpaired device를 검색하기 시작한다.
        console.log('페얼드된적있는 기기',devices +"기기의 수 : "+devices.length)
        if(devices.length==0) {
          //ios 일 경우에는 탐색을 마친다
          if($scope.devicePlatform=='ios'){
            $scope.finishSearchDevice();
            //android 의 경우 언페얼드 디바이스를 더 검색한다
          }else if($scope.devicePlatform=='android'){
            console.error('언페얼드 디바이스 검색 시작하나');
            $scope.discoverUnPairedDevices();
            //$scope.guestMode();
          }
        }else if(devices.length==1){
          $scope.aroundHangeulbotDevices = devices;
          $scope.finishSearchDevice();
        }else if(devices.length>1){
          $scope.aroundHangeulbotDevices = devices;
          $scope.finishSearchDevice();
        }
        //에러 발생
      },function(err){

      })
    }

    //주변의 페어링된적 없는 기기를 수색하며 ,
    //한글봇이 1대 발견되면 바로 연결
    //2대 이상이면 리스트 반환
    //0대 이면 한글봇을 못찾았다는 메시지 반환
    $scope.discoverUnPairedDevices = function(){
      console.error('언페얼드 디바이스 검색 시작하나');
      //
      //hangeulbotUtil.loadingModal(true,'한글봇을 찾고있어요',10);
      $scope.showLoadingPage('한글봇을 찾고있어요~!',true);


      //주변의 페어링 가능한 한글 봇 기기를 찾는다.
      var unpairedDeviceSearchPromise = Device.prototype.discoverUnpairedDevices();
      unpairedDeviceSearchPromise.then(function(devices){
        console.log('ㅇ언페얼드 data넘어왔다..'+devices.length);
        if(devices.length==0) {

        }else if(devices.length==1){
          $scope.aroundHangeulbotDevices=devices;
        }else if(devices.length>1){
          $scope.aroundHangeulbotDevices=devices;
        }
        $scope.finishSearchDevice();
      },function(err){

      })
    }

    $scope.finishSearchDevice = function(){

      //hangeulbotUtil.loadingModal(false,'한글봇 기기를 수색완료!',10)
      $scope.showLoadingPage('한글봇 기기수색 완료!',false);
      console.error('$scope.aroundHangeulbotDevices.length : '+$scope.aroundHangeulbotDevices.length);
      //에러 발생
      // 페어드된 적 있는 한글봇과 페어드된 적 없는 한글봇을 모두 수색하고 그 숫자에 따라 커넥트할 지 리스트를 보여줄 지 선택
      if($scope.aroundHangeulbotDevices.length==1){
        //바로 연결 시켜준다
        $scope.bluetoothConnect($scope.aroundHangeulbotDevices[0].id);

        //앱마켓을 위한 임시
        //$scope.userCondition = 'findNone'
      }else if($scope.aroundHangeulbotDevices.length>=2){
        //리스트로 연결 가능한 한글봇 기계들을 보여준다
        $scope.userCondition = 'findOverTwoDevice';
        var itemListHtml='<ul class="list alertList">';

        for(var i=0;i<$scope.aroundHangeulbotDevices.length;i++){
          itemListHtml
            +='<li class="item" ng-click="selectHangeulbotDeivce('+i+')">'
              +$scope.aroundHangeulbotDevices[i].id +' // '+ $scope.aroundHangeulbotDevices[i].name+'</li>';
        }

        itemListHtml+='</ul>';
        console.log('완성된 itemListHtml'+itemListHtml);
        $scope.tempNoBtnPromise = hangeulbotUtil.alertPopup('noBtn','접속할 한글 봇을 선택해주세요',itemListHtml,'','','','',$scope);


        //앱마켓을 위한 임시
        //$scope.userCondition = 'findNone'
      }else{
        console.error('언페얼드 디바이스 마저 없을때');
        //경고문을 출력하며 한글봇 재수색 버튼을 보여준다
        $scope.userCondition = 'findNone'
        hangeulbotUtil.alertPopup('twoBtn','주변에 한글봇 기기가 없습니다.',
          '<div class="alertPlainText">주변에 한글봇 기기가 없는 것 같아요.<br> 한글봇의 전원을 확인하시고, 재탐색버튼을 누르거나 한글봇이 없다면 구경하기 버튼으로 앱 내부를 구경하세요!</div>','재탐색','구경하기'
          ,function(){$scope.isOffline();},function(){$scope.guestMode()});
      }
    }
    $scope.selectHangeulbotDeivce = function(index){
      console.log(index+'번째 기기 블루투스 연결 시도');
      console.log('tempNoBtnPromise',$scope.tempNoBtnPromise);
      $scope.tempNoBtnPromise.close();

      $scope.bluetoothConnect($scope.aroundHangeulbotDevices[index].id);
    }
    //선택된 디바이스에 connect를 시도한다.
    $scope.bluetoothConnect = function(deviceId){
      //블루투스 device를 매개변수로 받는다.
      var nStart = new Date().getTime();
      console.log(deviceId+"에 접속을 시도함 시작시간 : "+nStart);

      $scope.showLoadingPage('한글봇과 블루투스 연결중~!');

      console.log(deviceId+"에 접속을 시도함");
      var connectPromise =Device.prototype.connect($scope.aroundHangeulbotDevices[0]);
      connectPromise.then(function(){

        //hangeulbotUtil.loadingModal(false,'한글봇에 접속 성공!')
        $scope.showLoadingPage('한글봇과 블루투스 접속 성공~!',false);

        var nEnd = new Date().getTime();
        console.log(deviceId+"에 접속 성공 완료시간 : "+nEnd);
        console.log("총 소요시간" + (nEnd-nStart)+"ms");
        //블루투스 신호를 받기위해 대기
        Device.prototype.subscribe();
        //5초마다 블루투스의 상태를 체크
        Device.prototype.bluetoothChecker();
        //블루투스 주소를 활용해 회원 인증 시도
        $scope.connect(deviceId);

      },function(e){
        console.log('접솔실패',e);
        $scope.showLoadingPage('한글봇과 블루투스 연결실패!',false);
        hangeulbotUtil.alertPopup('twoBtn','주변에 한글봇 기기가 없습니다.',
          '<div class="alertPlainText">주변에 한글봇 기기가 없거나 전원이 꺼져있어요.<br> 한글봇의 전원을 확인하시고, 재탐색버튼을 누르거나 한글봇이 없다면 구경하기 버튼으로 앱 내부를 구경하세요!</div>','재탐색','구경하기'
          ,function(){console.error('시발 왜 이게 실행되 오프라인');$scope.isOffline();},function(){console.error('시발 이게 실행되야지 게스트모드');$scope.guestMode()});
      })
    }
    $scope.guestMode = function(){
      console.log('게스트 모드')
      var mockDevice = {id:'18:F6:43:A9:A8:4C'}
      $scope.connect('18:F6:43:A9:A8:4C');
    }
    //이 메서드 그대로 나중에 connect 완성되면 그 다음 단계가 된다
    $scope.connect = function(deviceId){
        console.log('접속을 시도한다',deviceId)
        //hangeulbotUtil.loadingModal(true, '한글봇에 접속을 시도하고있어요!', 10)
        $scope.showLoadingPage('한글봇에 접속중..');

        HangeulbotDevice.getDeviceInfoByDeviceAddress(deviceId).then(function(connectionInfo){
          console.log('한글봇의 정보가 왔다',connectionInfo);
          if(connectionInfo.isHangeulbotDevice){
            //한글봇 디바이스 정보 입력
            HangeulbotDevice.setHangeulbotDevice(connectionInfo.hangeulbotDevice);

            //hangeulbotUtil.loadingModal(false,'한글봇에접속이 완료되었습니다!');
            $scope.showLoadingPage('한글봇 접속완료!',false);

            //등록된 유저가 이미 있는지 확인
            //유저가 있을 때
            if(!connectionInfo.isNotRegistered){
              HangeulbotUser.loginByUserId().then(function(data){

                //유저정보 삽입
                HangeulbotUser.setHangeulbotUser(data.hangeulbotUser);
                //로그인 토큰 저장
                AuthService.storeUserCredentials(data.token);
                //아이 있는지 여부
                HangeulbotUser.childRegistered = data.childRegistered;

                //등록된 아이가 있을 때
                if(data.childRegistered){
                  $state.go('selectChild');
                //등록아이가 없을 때
                }else{
                  console.log('여기로온다 아이가 없기때문에')
                  $state.go('insertChildInfo');
                }

              },function(error){

              })
            //유저가 없을 때
            }else{
              $state.go("insertInfo");
            }
            //todo : 페어링까지되었는데 한글봇 디바이스가 아닌경우 (그럴리 잆음 , 혹시그러면 disconnect 추가)
          }else{

          }
        },function(connectionInfo){

        });

    }





    $ionicPlatform.ready(function() {
      $scope.initialApp();
    })


  })
