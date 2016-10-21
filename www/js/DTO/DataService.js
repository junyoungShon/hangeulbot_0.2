/**
 * Created by jyson on 2016. 9. 28..
 */
angular.module('hangeulbotApp')
  .service('DataService',function(){
    var wordList = {};
    var statData = {};
    var setStatData = function(data){
      console.log('통계data 입력완료',data)
      statData = data;
    }
    var getStatData = function(){
      console.log('통계data 리턴완료',statData)
      return statData;
    }
    var getWordList = function(){
      return wordList;
    }
    var setWordList = function(list){
      wordList = list;
    }
    return {
      getWordList : getWordList,
      setWordList : setWordList,
      setStatData : setStatData,
      getStatData : getStatData
    }
  })
