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
      initCreditsAndDebts()
      $http.get(`${consts.apiUrl}/clientCycles/count`).then(function(resp) {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.createClientCycle = function() {
    const url = `${consts.apiUrl}/clientCycles`;
    $http.post(url, $scope.clientCycle).then(function(response) {
      $scope.clientCycle = {}
      initCreditsAndDebts()
      $scope.getClientCycles()
      msgs.addSuccess('Operação realizada com sucesso!!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabUpdate = function(clientCycle) {
    $scope.clientCycle = clientCycle
    initCreditsAndDebts()
    tabs.show($scope, {tabUpdate: true})
  }

  $scope.updateClientCycle = function() {
    const url = `${consts.apiUrl}/clientCycles/${$scope.clientCycle._id}`
    $http.put(url, $scope.clientCycle).then(function(response) {
      $scope.clientCycle = {}
      initCreditsAndDebts()
      $scope.getClientCycles()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabDelete = function(clientCycle) {
    $scope.clientCycle = clientCycle
    initCreditsAndDebts()
    tabs.show($scope, {tabDelete: true})
  }

  $scope.deleteClientCycle = function() {
    const url = `${consts.apiUrl}/clientCycles/${$scope.clientCycle._id}`
    $http.delete(url, $scope.clientCycle).then(function(response) {
       $scope.clientCycle = {}
       initCreditsAndDebts()
       $scope.getClientCycles()
       tabs.show($scope, {tabList: true, tabCreate: true})
       msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
       msgs.addError(resp.data)
    })
  }

  $scope.addDebt = function(index) {
    $scope.clientCycle.debts.splice(index + 1, 0, {})
  }

  $scope.cloneDebt = function(index, {name, value, status}) {
    $scope.clientCycle.debts.splice(index + 1, 0, {name, value, status})
    initCreditsAndDebts()
  }

  $scope.deleteDebt = function(index) {
    $scope.clientCycle.debts.splice(index, 1)
    initCreditsAndDebts()
  }

  $scope.addCredit = function(index) {
    $scope.clientCycle.credits.splice(index + 1, 0, {name: null, value: null})
  }

  $scope.cloneCredit = function(index, {name, value}) {
    $scope.clientCycle.credits.splice(index + 1, 0, {name, value})
    initCreditsAndDebts()
  }

  $scope.deleteCredit = function(index) {
    $scope.clientCycle.credits.splice(index, 1)
    initCreditsAndDebts()
  }

  $scope.cancel = function() {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.clientCycle = {}
    initCreditsAndDebts()
  }

  $scope.calculateValues = function() {
    $scope.credit = 0
    $scope.debt = 0

    if($scope.clientCycle) {
      $scope.clientCycle.credits.forEach(function({value}) {
        $scope.credit += !value || isNaN(value) ? 0 : parseFloat(value)
      })

      $scope.clientCycle.debts.forEach(function({value}) {
        $scope.debt += !value || isNaN(value) ? 0 : parseFloat(value)
      })
    }

    $scope.total = $scope.credit - $scope.debt
  }

  var initCreditsAndDebts = function() {
    if(!$scope.clientCycle.debts || !$scope.clientCycle.debts.length) {
      $scope.clientCycle.debts = []
      $scope.clientCycle.debts.push({})
    }

    if(!$scope.clientCycle.credits || !$scope.clientCycle.credits.length) {
      $scope.clientCycle.credits = []
      $scope.clientCycle.credits.push({})
    }

    $scope.calculateValues()
  }

  $scope.getClientCycles()
}
