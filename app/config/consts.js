angular.module('primeiraApp').constant('consts', {
  appName: 'Agreste Corretora',
  version: '1.0',
  owner: 'Urmininu',
  year: '2017',
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])

export default {
    API_URL: 'https://agreste-b.herokuapp.com/api',
    OAPI_URL: 'https://agreste-b.herokuapp.com/oapi',
}
