angular.module('primeiraApp').controller('CarCycleCtrl', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  CarCycleController
])

function CarCycleController($scope, $http, $location, msgs, tabs, consts) {

  $scope.getCarCycles = function() {
    const page = parseInt($location.search().page) || 1
    const url = `${consts.apiUrl}/carCycles?skip=${(page - 1) * 10}&limit=10`
    $http.get(url).then(function(resp) {
      $scope.carCycles = resp.data
      $scope.carCycle = {}
      initCarsAndOuts()
      $http.get(`${consts.apiUrl}/carCycles/count`).then(function(resp) {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.createCarCycle = function() {
    const url = `${consts.apiUrl}/carCycles`;
    $http.post(url, $scope.carCycle).then(function(response) {
      $scope.carCycle = {}
      initCarsAndOuts()
      $scope.getCarCycles()
      msgs.addSuccess('Operação realizada com sucesso!!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabUpdate = function(carCycle) {
    $scope.carCycle = carCycle
    initCarsAndOuts()
    tabs.show($scope, {tabUpdate: true})
  }

  $scope.updateCarCycle = function() {
    const url = `${consts.apiUrl}/carCycles/${$scope.carCycle._id}`
    $http.put(url, $scope.carCycle).then(function(response) {
      $scope.carCycle = {}
      initCarsAndOuts()
      $scope.getCarCycles()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabDelete = function(carCycle) {
    $scope.carCycle = carCycle
    initCarsAndOuts()
    tabs.show($scope, {tabDelete: true})
  }

  $scope.deleteCarCycle = function() {
    const url = `${consts.apiUrl}/carCycles/${$scope.carCycle._id}`
    $http.delete(url, $scope.carCycle).then(function(response) {
       $scope.carCycle = {}
       initCarsAndOuts()
       $scope.getCarCycles()
       tabs.show($scope, {tabList: true, tabCreate: true})
       msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
       msgs.addError(resp.data)
    })
  }

  $scope.addOut = function(index) {
    $scope.carCycle.outs.splice(index + 1, 0, {})
  }

  $scope.cloneOut = function(index, {name, value, status}) {
    $scope.carCycle.outs.splice(index + 1, 0, {name, value, status})
    initCarsAndOuts()
  }

  $scope.deleteOut = function(index) {
    $scope.carCycle.outs.splice(index, 1)
    initCarsAndOuts()
  }

  $scope.addCredit = function(index) {
    $scope.carCycle.cars.splice(index + 1, 0, {name: null, value: null})
  }

  $scope.cloneCredit = function(index, {name, value}) {
    $scope.carCycle.cars.splice(index + 1, 0, {name, value})
    initCarsAndOuts()
  }

  $scope.deleteCredit = function(index) {
    $scope.carCycle.cars.splice(index, 1)
    initCarsAndOuts()
  }

  $scope.cancel = function() {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.carCycle = {}
    initCarsAndOuts()
  }

  $scope.calculateValues = function() {
    $scope.car = 0
    $scope.out = 0

    if($scope.carCycle) {
      $scope.carCycle.cars.forEach(function({value}) {
        $scope.car += !value || isNaN(value) ? 0 : parseFloat(value)
      })

      $scope.carCycle.outs.forEach(function({value}) {
        $scope.out += !value || isNaN(value) ? 0 : parseFloat(value)
      })
    }

    $scope.total = $scope.car - $scope.out
  }

  var initCarsAndOuts = function() {
    if(!$scope.carCycle.outs || !$scope.carCycle.outs.length) {
      $scope.carCycle.outs = []
      $scope.carCycle.outs.push({})
    }

    if(!$scope.carCycle.cars || !$scope.carCycle.cars.length) {
      $scope.carCycle.cars = []
      $scope.carCycle.cars.push({})
    }

    $scope.calculateValues()
  }

  $scope.getCarCycles()
}
