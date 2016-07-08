angular.module('hangeulbotApp')
  .directive('duplicateEmail', function($http,API_ENDPOINT) {

  return {

      require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

        ctrl.$validators.email= function(modelValue, viewValue) {

          console.log(modelValue);
          console.log('ㅇ여기오는지 봐랍');
          if (ctrl.$isEmpty(modelValue)) {
            console.log("modelValue"+modelValue)
            return modelValue;
          }

          $http({
            method: 'POST',
            url: API_ENDPOINT.url+'/isDuplicated/',
            data:modelValue,
          }).then(function successCallback(response) {

          var valid = response.data;
          console.log(response.data)
          //true면 무효
          if(response.data){
            console.log("중복된다")
            ctrl.$setValidity('duplicateEmail',false)
            $digest();
            return modelValue;
          }else{
            console.log("중복안된다")
            //false 면 이걸로 유효성 검증을 유효하게 마쳐 버리니까 정규식 안맞아도 문제가 안됨
           var emailRegExp = '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$';
           if(modelValue.match(emailRegExp)){
             ctrl.$setValidity('duplicateEmail',true)
             return modelValue;
           }else{
             ctrl.$setValidity('duplicateEmail',false)
             return modelValue;
           }

           }


          })

        };
      }
    }
  })
