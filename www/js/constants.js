/**
 * Created by jyson on 2016. 7. 6..
 */
angular.module('hangeulbotApp')

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  .constant('API_ENDPOINT', {
    url: 'http://192.168.0.146:8888'
    //url:'http://192.168.0.146:8888'
    //For a simulator use: url: 'http://192.168.0.146:8888'
    //For a Desktop use: url: '/api'
  });
