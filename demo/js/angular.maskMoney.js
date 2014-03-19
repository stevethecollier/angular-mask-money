angular.module('maskMoney', [])
    .directive('maskMoney', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                mmOptions: '=?',
                prefix: '=',
                suffix: '=',
                affixesStay: '=',
                thousands: '=',
                decimal: '=',
                precisoin: '=',
                allowZero: '=',
                allowNegative: '='
            },
            compile: function() {
                return function(scope, el, attr, ctrl) {

                    scope.$watch('mmOptions', init, true);
                    el.on('keyup', eventHandler); //change to $watch or $observe


                    //this parser will unformat the string for the model behid the scenes
                    function parser(fromViewValue) {
                        return $(el).maskMoney('unmasked')[0]
                    }
                    ctrl.$parsers.push(parser)

                    function eventHandler() {

                        if (!scope.$$phase) {
                            scope.$apply(function() {
                                ctrl.$setViewValue($(el).val());
                            });
                        }
                    }

                    function init(options) {
                        setTimeout(function() {
                            elOptions = {
                                prefix: scope.prefix || '',
                                suffix: scope.suffix,
                                affixesStay: scope.affixesStay,
                                thousands: scope.thousands,
                                decimal: scope.decimal,
                                precision: scope.precision,
                                allowZero: scope.allowZero,
                                allowNegative: scope.allowNegative
                            }

                            if (!scope.mmOptions) {
                                scope.mmOptions = {};
                            }

                            for (elOption in elOptions) {
                                if (elOptions[elOption]) {
                                    scope.mmOptions[elOption] = elOptions[elOption];
                                }
                            }

                            console.dir(scope.mmOptions)
                            $(el).maskMoney(scope.mmOptions);
                            $(el).maskMoney('mask');
                            eventHandler()

                        }, 0);
                    }

                }
            }
        }
    });

/*

todo:

add live update option
	update on blur
	or update on change

live update inline attributes

eventually, remove jquery and mask-money deps

*/