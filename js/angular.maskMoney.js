angular.module('maskMoney', [])
.directive('maskMoney', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			model: '=ngModel',
			options: '=maskMoney',
		},
		compile: function(){
			return function (scope, el, attr, ctrl) {
				scope.$watch('options', init, true);
				el.on('keyup', eventHandler);
				function eventHandler(){
					
					// console.log('eventHandler');
					
					scope.$apply(function(){
						// console.log('setViewValue');
						ctrl.$setViewValue($(el).maskMoney('unmasked')[0]);
					});

					// console.log('$viewValue:');
					// console.log(ctrl.$viewValue);
					// console.log('$modelValue:');
					// console.log(ctrl.$modelValue);

				}
				function init(options){
					// console.log('init');
					setTimeout(function(){
						// console.log('timeout')
						$(el).maskMoney(options);
						$(el).maskMoney('mask');
						eventHandler()
					},0);
				}
			}
		}
	}
});