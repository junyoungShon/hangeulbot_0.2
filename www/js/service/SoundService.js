/**
 * Created by jyson on 2016. 9. 7..
 */
angular.module('hangeulbotApp')
  .factory('SoundService',function($q,$cordovaMedia,$cordovaNativeAudio){

    /**
     * 1. 로컬 사운드 및 배경음 출력 ( 배경음은 로컬에 저장해두자? )
     * $cordovaNativeAudio를 활용한다 ( 외부 파일을 저장할 수 없지만 , 가볍고 빠르다. 또한 동시에 여러미디어 재생이 가능하다)
     *
     * 2. 외부 사운드 및 효과음 출력 (서버로 부터 받아요, 콘텐츠 특유의 효과음 용)
     * $cordovaMedia를 활용한다 (외부 파일을 재생할 수 있지만 여러 미디어를 재생할 수 없다)
     *
     * 요구사항 (자유로운 플레이와 스톱 / 자원의 효율적 사용 / 다중 재생 /)
     */

    /*//로컬 사운드 담는 배열
    var localSoundList = [];*/
    var SoundService = {
      soundList : [],
      pushSoundList : function(sound){
        SoundService.soundList.push(sound);
        console.log('현재 사운드리스트',SoundService.soundList)
      },
      changeStatus : function(sound){
        for(var i=0;i<SoundService.soundList.length;i++){
          if(SoundService.soundList[i].id == sound.id){
            SoundService.soundList[i].status = sound.status;
          }
        }
        console.log('현재 사운드리스트',SoundService.soundList)
      }
    };

    SoundService.prototype = {

      localPreloadSimple : function(id,filePath,completeCallback){
        /*$cordovaNativeAudio.preloadSimple(id,filePath,completeCallback,function(msg){console.log('preloadSimple : ',msg)},function(msg){
            console.log('preloadSimple: '+msg)
        }).then(function(){
          completeCallback();
        })*/
      },

      localPreloadComplex : function(id,filePath,volume,voices,delay,completeCallback){
       /* $cordovaNativeAudio.preloadComplex(id,filePath,volume,voices,delay).then(completeCallback,function(msg){
          console.log('preloadSimple: '+msg)
        })
        SoundService.pushSoundList({id:id,status:'load',source:'native'})*/
      },

      localMusicPlay : function(id,completeCallback){
       /* $cordovaNativeAudio.play(id,completeCallback)
          .then(function(msg){console.log('Local play Success: ',msg)},function(msg){console.log('Local play fail: ',msg)});*/
      },

      localMusicLoop : function(id){
       /* console.log('배경음 루프 돌리기 시작합니다')
        $cordovaNativeAudio.loop(id).then(function(msg){console.log('Local loop: '+msg)},function(msg){console.log('Local loop: '+msg)});
        SoundService.changeStatus({id:id,status:'loop',source:'native'})*/
      },
      localMusicStop : function(id){
        /*$cordovaNativeAudio.stop(id,function(msg){console.log('preloadSimple: '+msg)},function(msg){console.log('preloadSimple: '+msg)});
        SoundService.changeStatus({id:id,status:'stop',source:'native'})*/
      },
      localMusicUnload : function(id){
        /*$cordovaNativeAudio.unload(id,function(msg){console.log('preloadSimple: '+msg)},function(msg){console.log('preloadSimple: '+msg)});
        SoundService.changeStatus({id:id,status:'unload',source:'native'})*/
      }
    }
    return SoundService;
  })
