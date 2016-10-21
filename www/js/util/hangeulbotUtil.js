/**
 * Created by jyson on 2016. 7. 6..
 */


/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('hangeulbotUtil',function($ionicPopup,$ionicLoading,$q){
    var alertPopup = function(popupKind,title,template,buttonText,buttonText2,leftFunction,rightFunction,scope){

      if(popupKind=='oneBtn'){

        var curruntPopup =  $ionicPopup.alert({
          title: title,
          template: template,
          buttons : [
            {text:buttonText,type:'leftBtn'}
          ]
        })
        curruntPopup.then(function(){leftFunction()});

      }else if(popupKind=='twoBtn'){

        var curruntPopup =  $ionicPopup.show({
          title: title,
          template: template,
          buttons : [
            {text:buttonText,type:'leftBtn',onTap:leftFunction},
            {text:buttonText2,type:'rightBtn',onTap:rightFunction}
          ]
        })

        curruntPopup.then(function(res){
            console.error("res"+res);
            if(res){
              rightFunction();
            }else{

            }
          })

      }else if(popupKind=='noBtn'){

        var curruntPopup =  $ionicPopup.confirm({
          title: title,
          template: template,
          buttons : [],
          scope: scope
        })
        return curruntPopup;
      }
    }

    var loadScript = function (url, type, charset) {
      if (type === undefined) type = 'text/javascript';
      if (url) {
        var script = document.querySelector("script[src*='" + url + "']");
        if (!script) {
          var heads = document.getElementsByTagName("head");
          if (heads && heads.length) {
            var head = heads[0];
            if (head) {
              script = document.createElement('script');
              script.setAttribute('src', url);
              script.setAttribute('type', type);
              script.setAttribute('id','previousContent')
              if (charset) script.setAttribute('charset', charset);
              head.appendChild(script);
            }
          }
          console.log('loadScript여기는 오는지가 궁금하오'+script.toString())
          return script;
        }else{
          var heads = document.getElementsByTagName("head");
          var head = heads[0];
          head.removeChild(document.getElementById("previousContent"));
          if(heads && heads.length) {
            var head = heads[0];
            if (head) {
              script = document.createElement('script');
              script.setAttribute('src', url);
              script.setAttribute('type', type);
              script.setAttribute('id','previousContent')
              if (charset) script.setAttribute('charset', charset);
              head.appendChild(script);
            }
          }
          return script;
        }
      }
    };
    var hangulToSoundName = function (text)
    {
      var cCho  = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
        cJung = [ 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ' ],
        rJung = [ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" ],
        cJong =
          [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ'
            , 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
        cGieuk = ['ㄱ','ㄲ','ㄳ','ㅋ'],
        cNieun = ['ㄴ','ㄵ','ㄶ'],
        cDigeut = ['ㄷ','ㅈ','ㅊ','ㅌ','ㅎ','ㅅ',''],
        cRieul = ['ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ'],
        cMieum = ['ㅁ'],
        cBieup = ['ㅂ', 'ㅄ','ㅍ'],
        cIeun = ['ㅇ'],
        cho, jung, jong;


      var str = text,
        cnt = str.length,
        chars = [],
        cCode;

      var soundName;

      for (var i = 0; i < cnt; i++) {
        cCode = str.charCodeAt(i);

        if (cCode == 32) { continue; }

        // 한글이 아닌 경우
        if (cCode < 0xAC00 || cCode > 0xD7A3) {
          chars.push(str.charAt(i));
          continue;
        }

        cCode  = str.charCodeAt(i) - 0xAC00;

        jong = cCode % 28; // 종성
        jung = ((cCode - jong) / 28 ) % 21 // 실제 중성 인덱스

        cho  = (((cCode - jong) / 28 ) - jung ) / 21 // 초성

        jung = cJung.indexOf(rJung[jung]);// 소리 변환 법칙에 따른 중성 인덱스로 변환


        if (cJong[jong] !== '') {
          console.log('초성'+cho+' '+cCho[cho]+' 중성 '+jung+' '+cJung[jung]+' 종성'+jong+' '+cJong[jong])
          soundName = (cho+1) + ((jung+1)*32);
          if(cGieuk.indexOf(cJong[jong])!=-1){
            soundName += 1024*1;
          }
          if(cNieun.indexOf(cJong[jong])!=-1){
            soundName += 1024*2;
          }
          if(cDigeut.indexOf(cJong[jong])!=-1){
            soundName += 1024*3;
          }
          if(cRieul.indexOf(cJong[jong])!=-1){
            soundName += 1024*4;
          }
          if(cMieum.indexOf(cJong[jong])!=-1){
            soundName += 1024*5;
          }
          if(cBieup.indexOf(cJong[jong])!=-1){
            soundName += 1024*6;
          }
          if(cIeun.indexOf(cJong[jong])!=-1){
            soundName += 1024*7;
          }

        }else{
          console.log('초성'+cho+' '+cCho[cho]+' 중성 '+jung+' '+cJung[jung])
          soundName = (cho+1) + ((jung+1)*32);
        }
        //두자리 일때
        if(soundName<100){
          soundName = '00'+ String(soundName)+'.mp3'
        }else if(soundName<1000){
          soundName = '0'+String(soundName)+'.mp3'
        }else if(soundName>=1000){
          soundName = String(soundName)+'.mp3'
        }

        chars.push(cCho[cho], cJung[jung]);
        if (cJong[jong] !== '') { chars.push(cJong[jong]); }
      }

      return soundName;
    }


    var textAssembler = function(disassembledWord){

      console.log('ㄴ나양낭러ㅣㅇㄹ')

      if((disassembledWord[0]=="!"&&disassembledWord[disassembledWord.length-1]=="@")){
        var result='';
        disassembledWord = disassembledWord.replace("!","").replace("@","");
        var disassembledWordList = disassembledWord.split(',');
        var charList = [];
        console.log(disassembledWord);
        for(var i=0;i<disassembledWordList.length;i++){
          var index = Math.floor(i/3)
          if(i%3==2){
            var uniCho = Number(disassembledWordList[((i%3)+(3*index))-2]-1);
            var uniJung = Number(disassembledWordList[((i%3)+(3*index))-1]-1);
            var uniJong = Number(disassembledWordList[(i%3)+(3*index)]);



            var uniHan = 44032+(uniCho * 588)+(uniJung * 28)+uniJong;

            console.log('초성 : '+uniCho+'/ 중성 : '+uniJung+'/ 종성 : '+uniJong +' /합친코드 : '+uniHan);

            charList[index] = String.fromCharCode(uniHan);
            result += String.fromCharCode(uniHan)
            console.log('인덱스 '+index+'일때 '+charList[index])
          }


        }
        for(var i=0;i<charList.length;i++){
          console.log(charList[i]);
        }
      }else{
        result = false;
      }
      console.log('결과는 ? ' + result);
      return result;
    }

    return {
      alertPopup : alertPopup,
      loadScript : loadScript,
      hangulToSoundName : hangulToSoundName,
      textAssembler : textAssembler
    };

  })
