angular.module('maskMoney', [])
    .directive('maskMoney', function($timeout, $locale) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
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
            link: function(scope, el, attr, ctrl) {

                scope.$watch(checkOptions, init, true);

                scope.$watch(attr.ngModel, eventHandler, true);
                //el.on('keyup', eventHandler); //change to $watch or $observe

                function checkOptions() {
                    return scope.mmOptions;
                }

                function checkModel() {
                    return scope.model;
                }



                //this parser will unformat the string for the model behid the scenes
                function parser() {
                    return $(el).maskMoney('unmasked')[0]
                }
                ctrl.$parsers.push(parser);
                
                ctrl.$formatters.push(function(value){
                  $timeout(function(){
                    init();
                  });
                  return parseFloat(value).toFixed(2);
                });

                function eventHandler() {
                    $timeout(function() {
                        scope.$apply(function() {
                            ctrl.$setViewValue($(el).val());
                        });
                    })
                }

                function init(options) {
                    $timeout(function() {
                        elOptions = {
                            prefix: scope.prefix || '',
                            suffix: scope.suffix,
                            affixesStay: scope.affixesStay,
                            thousands: scope.thousands || $locale.NUMBER_FORMATS.GROUP_SEP,
                            decimal: scope.decimal || $locale.NUMBER_FORMATS.DECIMAL_SEP,
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

                        $(el).maskMoney(scope.mmOptions);
                        $(el).maskMoney('mask');
                        eventHandler()

                    }, 0);

                    $timeout(function() {
                        scope.$apply(function() {
                            ctrl.$setViewValue($(el).val());
                        });
                    })

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
