angular.module('primeiraApp').constant('consts', {
  appName: 'Agreste Car',
  version: '1.0',
  owner: 'Urminino',
  year: '2018',
  site: 'http://cod3r.com.br',
  apiUrl: 'http://localhost:3003/api',
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
