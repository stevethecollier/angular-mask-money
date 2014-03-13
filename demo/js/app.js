angular.module('angularMaskMoneyDemo', ['maskMoney']).run(['$rootScope',
	function($scope){

	console.log('app is running')

	$scope.options = {
		prefix: '$'
	}

	$scope.anotherModel = 'someString'

}])