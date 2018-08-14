angular.module('primeiraApp').config([
	'$stateProvider',
	'$urlRouterProvider',
	'$httpProvider',
	function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('carCycle', {
      url: "/carCycles?page",
      templateUrl: "carCycle/tabs.html"
    }).state('clientCycle', {
      url: "/clientCycles?page",
      templateUrl: "clientCycle/tabs.html"
    })

		$httpProvider.interceptors.push('handleResponseError')
	}
]).run([
  '$rootScope',
  '$http',
  '$location',
  '$window',
  'auth',
  function ($rootScope, $http, $location, $window, auth) {
    validateUser()
    $rootScope.$on('$locationChangeStart', () => validateUser())

    function validateUser() {
      const user = auth.getUser()
      const authPage = '/dashboard.html'
      const isAuthPage = $window.location.href.includes(authPage)

      if (!user && !isAuthPage) {
        $window.location.href = authPage
      } else if (user && !user.isValid) {
            user.isValid = true
            $http.defaults.headers.common.Authorization = user.token
            isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
          }
      }
}
])
