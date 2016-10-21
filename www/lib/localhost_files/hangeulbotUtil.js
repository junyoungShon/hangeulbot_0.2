/**
 * Created by jyson on 2016. 7. 6..
 */


/**
 * Created by jyson on 2016. 6. 23..
 */
angular.module('hangeulbotApp')
  .factory('hangeulbotUtil',function($ionicPopup,$ionicLoading,$q){

    var alertPopup = function(title,template){
      var q = $q.defer();
      var curruntPopup =  $ionicPopup.alert({
        title: title,
        template: template
      });
      curruntPopup.then(function(){
        q.resolve();
      },function(){});
      return q.promise;
    }


    var loadingModal = function(showingOverlay,message,time){
      if(showingOverlay){
          console.log('실행은되냐')
          $ionicLoading.show({
            template: /*<h2>'+'Loading'+'</h2>*/'<div><img src="img/loading0.png" alt="" width="30%"/><h4>'+message+'</h4>'+
            '<div class="progress-bar blue stripes">'+
            '<md-progress-linear md-mode="indeterminate"></md-progress-linear>'+
            '</div></div>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            showDelay: 0
          })



      }else{
        setTimeout(function () {

            $ionicLoading.show({
              template: /*<h2>'+'Loading'+'</h2>*/'<div><img src="img/loading0.png" alt="" width="30%"/><h4>'+message+'</h4>'+
              '<div class="progress-bar blue stripes">'+
              '<md-progress-linear md-mode="indeterminate"></md-progress-linear>'+
              /*'<span id="progressWidth" style="width: 100%"></span>'+*/
              '</div></div>',
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: false,
              showDelay: 0
            })

        }, 1000);
        setTimeout(function () {

            $ionicLoading.hide();

        }, 1500);
      }
    }



    return {
      alertPopup : alertPopup,
      loadingModal : loadingModal,

    };

  })
