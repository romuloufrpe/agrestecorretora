angular.module('primeiraApp').constant('consts', {
  appName: 'Agreste Corretora',
  version: '1.0',
  owner: 'Urmininu',
  apiURL:'https://agreste-b.herokuapp.com/api',
  oapiURL: 'https://agreste-b.herokuapp.com/oapi',
  year: '2017',
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
