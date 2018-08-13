angular.module('primeiraApp').controller('ClientCycleCtrl', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  ClientCycleController
])

function ClientCycleController($scope, $http, $location, msgs, tabs, consts) {

  $scope.getClientCycles = function() {
    const page = parseInt($location.search().page) || 1
    const url = `${consts.apiUrl}/clientCycles?skip=${(page - 1) * 10}&limit=10`
    $http.get(url).then(function(resp) {
      $scope.clientCycles = resp.data
      $scope.clientCycle = {}
      initClientsAndOuts()
      $http.get(`${consts.apiUrl}/clientCycles/count`).then(function(resp) {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.createClientCycle = function(){
    const url = `${consts.apiUrl}/clientCycles`;
    $http.post(url,$scope.clientCycle).then(function(response){
      $scope.clientCycle = {}
      initClientsAndOuts()
      $scope.getClientCycles()
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp){
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabUpdate = function(clientCycle) {
    $scope.clientCycle = clientCycle
    initClientsAndOuts()
    tabs.show($scope, {tabUpdate: true})
  }

  $scope.updateClientCycle = function() {
    const url = `${consts.apiUrl}/clientCycles/${$scope.clientCycle._id}`
    $http.put(url, $scope.clientCycle).then(function(response) {
      $scope.clientCycle = {}
      initClientsAndOuts()
      $scope.getClientCycles()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabDelete = function(clientCycle) {
    $scope.clientCycle = clientCycle
    initClientsAndOuts()
    tabs.show($scope, {tabDelete: true})
  }

  $scope.deleteClientCycle = function() {
    const url = `${consts.apiUrl}/clientCycles/${$scope.clientCycle._id}`
    $http.delete(url, $scope.clientCycle).then(function(response) {
       $scope.clientCycle = {}
       initClientsAndOuts()
       $scope.getClientCycles()
       tabs.show($scope, {tabList: true, tabCreate: true})
       msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
       msgs.addError(resp.data)
    })
  }

  $scope.addDebt = function(index) {
    $scope.clientCycle.outs.splice(index + 1, 0, {})
  }

  $scope.cloneDebt = function(index, {name, value, status}) {
    $scope.clientCycle.outs.splice(index + 1, 0, {name, value, status})
    initClientsAndOuts()
  }

  $scope.deleteDebt = function(index) {
    $scope.clientCycle.outs.splice(index, 1)
    initClientsAndOuts()
  }

  $scope.addClient = function(index) {
    $scope.clientCycle.clients.splice(index + 1, 0, {name: null, value: null})
  }

  $scope.cloneClient = function(index, {name, value}) {
    $scope.clientCycle.clients.splice(index + 1, 0, {name, value})
    initClientsAndOuts()
  }

  $scope.deleteClient = function(index) {
    $scope.clientCycle.clients.splice(index, 1)
    initClientsAndOuts()
  }

  $scope.cancel = function() {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.clientCycle = {}
    initClientsAndOuts()
  }

  $scope.calculateValues = function() {
    $scope.client = 0
    $scope.out = 0

    if($scope.clientCycle) {
      $scope.clientCycle.clients.forEach(function({value}) {
        $scope.client += !value || isNaN(value) ? 0 : parseFloat(value)
      })

      $scope.clientCycle.outs.forEach(function({value}) {
        $scope.out += !value || isNaN(value) ? 0 : parseFloat(value)
      })
    }

    $scope.total = $scope.client - $scope.out
  }

  var initClientsAndOuts = function() {
    if(!$scope.clientCycle.outs || !$scope.clientCycle.outs.length) {
      $scope.clientCycle.outs = []
      $scope.clientCycle.outs.push({})
    }

    if(!$scope.clientCycle.clients || !$scope.clientCycle.clients.length) {
      $scope.clientCycle.clients = []
      $scope.clientCycle.clients.push({})
    }

    $scope.calculateValues()
  }

  $scope.getClientCycles()
}
