angular.module('primeiraApp').constant('consts', {
  appName: 'Agreste Corretora',
  version: '1.0',
  owner: 'Urmininu',
  year: '2017',
  apiUrl: 'https://agreste-b.herokuapp.com/api',
  oapiUrl: 'https://agreste-b.herokuapp.com/oapi',
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
