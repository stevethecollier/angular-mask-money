angular.module('angularMaskMoneyDemo', ['maskMoney']).run(['$rootScope',
    function($scope) {

        console.log('app is running')

        $scope.options = {
            prefix: '$'
        }


        $scope.options2 = {
            prefix: 'erik'
        }

        $scope.anotherModel = 'someString'

    }
])