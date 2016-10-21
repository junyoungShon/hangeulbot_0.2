/**
 * Created by jyson on 2016. 9. 5..
 */
/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('HangeulbotChild',function($q,$http,HangeulbotDevice,AuthService,API_ENDPOINT,HangeulbotUser){
    var hangeulbotChildren = [];
    var hangeulbotChild = {
      childNum : 0,
      childName :'',
      childBirth:'',
      childGender:'',
      childPhoto:'',
      childLevel:'',
      childExp:'',
      childIdx:'',
      userId: HangeulbotUser.getHangeulbotUser().userId
    }
    var contentList = [];
    var infoTypeChanger = function(){
      for(var i=0;i<this.hangeulbotChildren.length;i++){
        this.hangeulbotChildren[i].childBirth = new Date(this.hangeulbotChildren[i].childBirth).customFormat('#YYYY#-#MM#-#DD#');
        if(this.hangeulbotChildren[i].childGender==1){
          this.hangeulbotChildren[i].childGender = '남아';
        }else{
          this.hangeulbotChildren[i].childGender = '여아';
        }
      }
    }

    var setHangeulbotChild = function(hangeulbotChild){
      hangeulbotChildren.push(hangeulbotChild);
      this.hangeulbotChild = hangeulbotChild;
    }
    var getHangeulbotChild = function(){
      return this.hangeulbotChild;
    }

    var registerChild = function(hangeulbotUserInfo){
      return $q(function(resolve, reject) {
        //deviceInfo.hangeulbotUser = userInfo;
        $http({
          method: 'PUT', //방식
          url: API_ENDPOINT.url+'/deviceInfoAndUserInfo',
          data: hangeulbotUserInfo,
          dataType:'json'
        }).success(function(data, status, headers, config) {
          console.log("HttpStatus : "+ status );

          AuthService.storeUserCredentials(data.token);
          UserInfo.userInfo = data.hangeulbotUser;
          resolve(data);

        }).error(function(data, status, headers, config) {
          reject(result.data.msg);
        });
      });
    }

    var getChildLevel = function(exp){
      var childLevel;
      var levelStandardExp = [{1:100,2:250,3:500,4:1000,5:2000,6:3500,7:7000,8:15000,9:30000,10:70000}];
      var childCurrentExp = exp;
      for(var i=0;i<levelStandardExp.length;i++){
        console.log('이거 계산은 시도하냐 이시키야!!!')
        if(levelStandardExp[i]>childCurrentExp) {
          childLevel = levelStandardExp[i];
        }else{
          if(i==0){
            childLevel = 1;
            return childLevel;
          }else{
            return childLevel;
          }
        }
      }
    }

    var goMainContentPage = function(hangeulbotChild){
      return $q(function(resolve, reject) {
        //deviceInfo.hangeulbotUser = userInfo;
        console.log('보낸다',hangeulbotChild);
        if(hangeulbotChild.childGender=='남아'){
          hangeulbotChild.childGender=1
        }else{
          hangeulbotChild.childGender=2
        }
        $http({
          method: 'POST', //방식
          url: API_ENDPOINT.url+'/mainResources',
          data:hangeulbotChild,
          dataType:'json'
        }).success(function(data, status, headers, config) {

          resolve(data);
        }).error(function(data, status, headers, config) {
          reject(result.data.msg);
        });
      });
    }

    return {
      hangeulbotChildren : hangeulbotChildren,
      hangeulbotChild:hangeulbotChild,
      setHangeulbotChild : setHangeulbotChild,
      getHangeulbotChild : getHangeulbotChild,
      goMainContentPage : goMainContentPage,
      getChildLevel : getChildLevel,
      registerChild : registerChild,
      infoTypeChanger: infoTypeChanger,
      contentList : contentList
    };

  })
