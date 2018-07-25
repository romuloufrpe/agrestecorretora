angular.module('primeiraApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('carCycle', {
      url: "/carCycles?page",
      templateUrl: "carCycle/tabs.html"
    }).state('clientCycle', {
      url: "/clientCycles?page",
      templateUrl: "clientCycle/tabs.html"
    }).state('listClientCycle', {

      templateUrl: "clientCycle/list.html"
    }).state('listCarCycle', {

      templateUrl: "carCycle/list.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
}])
